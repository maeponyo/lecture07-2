navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;

var app = {
  preview: document.querySelector("video"),
  shoot: document.querySelector("#shoot"),
  canvas: document.querySelector("canvas"),
  sliderX: document.querySelector("#width"),
  sliderY: document.querySelector("#height"),
  stream: null
};

var MEDIA_CONSTRAINT = {
  video: true,
  audio: false
};

function streamAquired(stream){
  app.stream = stream;
  app.preview.src = window.URL.createObjectURL(stream);
  app.preview.play();
}

function streamAquisitionFailed(error){
  console.log(error);
}

function getPixel(x, y){
  var result = app.ctx.getImageData(x, y, 1, 1);
  return result.data;
}

function formatColor(color){
  return "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
};

function updateMosaicSize(){
  givenWidth = Number(app.sliderX.value);
  givenHeight = Number(app.sliderY.value);
};


function mosaic(){
  updateMosaicSize();
  var i = 0; 
  var width = givenHeight;
  var height = givenWidth;
  while(i < app.canvas.width){
    var j = 0;
    while(j < app.canvas.height){
      var color = getPixel(i, j);
      app.ctx.fillStyle = formatColor(color);
      app.ctx.fillRect(i, j, width, height);
      j = j + height;
    }
    i = i + width;
  }
}

function processImage(){
  mosaic();
}

function capture(){
  if(app.stream != null){
    app.ctx.drawImage(app.preview, 0, 0, app.canvas.width, app.canvas.height);
  }
  processImage();
}

function initialize(){
  app.shoot.addEventListener("click", capture);
  app.ctx = app.canvas.getContext("2d");
  navigator.getUserMedia(MEDIA_CONSTRAINT, streamAquired, streamAquisitionFailed);
}

function unload(){
  if(app.stream != null){
    app.stream.stop();
    app.stream = null;
  }
}


window.addEventListener("load", initialize);
window.addEventListener("unload", unload);


