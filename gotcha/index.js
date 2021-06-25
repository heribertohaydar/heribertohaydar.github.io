let imgElement = document.getElementById("imageSrc");
let inputElement = document.getElementById("fileInput");
inputElement.addEventListener("change", ResizeImage);

function recognizeText(file) {
  Tesseract.recognize(file, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    document.getElementById("convertedUrl").href = text;
    document.getElementById("convertedUrl").textContent = text;
  });
}

function ResizeImage() {
  var filesToUploads = document.getElementById("fileInput").files;
  var file = filesToUploads[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var MAX_WIDTH = 400;
      var MAX_HEIGHT = 400;
      var width = img.width;
      var height = img.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      dataurl = canvas.toDataURL(file.type);
      document.getElementById("imageSrc").src = dataurl;
      recognizeText(dataurl);
    };
  };
  reader.readAsDataURL(file);
}
