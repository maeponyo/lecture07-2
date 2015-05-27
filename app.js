navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;

var app = {
  preview: document.querySelector("video"),
  shoot: document.querySelector("#shoot"),
  canvas: document.querySelector("canvas"),
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

function capture(){
  if(app.stream != null){
    app.ctx.drawImage(app.preview, 0, 0, app.canvas.width, app.canvas.height);
  }
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

