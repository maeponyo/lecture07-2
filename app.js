navigator.getUserMedia = 
  navigator.getUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.webkitGetUserMedia;

var app = {
  preview: document.querySelector("video"),
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

function initialize(){
  navigator.getUserMedia(MEDIA_CONSTRAINT, streamAquired, streamAquisitionFailed);
}

function unload(){
  if(app.stream != null){
    app.stream.stop();
    app.stream = null;
  }
}

window.addEventListener("unload", unload);

