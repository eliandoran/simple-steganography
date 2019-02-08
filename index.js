function getRandomImageURL() {
    return "https://source.unsplash.com/random/800x600";
}

// Load image
var sourceImage = document.getElementById("source-image");
sourceImage.src = getRandomImageURL();
sourceImage.onload = function() {
    drawImage(this);
};

// Prepare canvas
function drawImage(image) {
    var destCanvas = document.getElementById("destination-canvas");
    destCanvas.width = image.width;
    destCanvas.height = image.height;

    var ctx = destCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
}