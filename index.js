function getRandomImageURL() {
    return "https://source.unsplash.com/random/800x600";
}

// Load image
var sourceImage = document.getElementById("source-image");
sourceImage.crossOrigin = "Anonymous";
sourceImage.src = getRandomImageURL();
sourceImage.onload = function() {
    drawImage(this, {
        message: "Hello world.",
        width: 800,
        height: 600
    });
};

// Form
var form = document.getElementById("entry-form");
form.onsubmit = function() {
    const data = new FormData(form);
    console.log(data);

    return false;
};

// Prepare canvas
function drawImage(image, data) {
    var message = (data.message);
    console.log(data);
    const encoder = new TextEncoder();
    const encodedData = encoder
        .encode(message);

    var destCanvas = document.getElementById("destination-canvas");
    destCanvas.width = data.width;
    destCanvas.height = data.height;
    destCanvas.style.width = image.width + "px";
    destCanvas.style.height = image.height + "px";
    
    var ctx = destCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    var imageData = ctx.getImageData(0, 0, destCanvas.width, destCanvas.height);
    var data = imageData.data;

    let bits = "";

    for (let byte of encodedData) {
        for (let i=0; i<8; i++) {
            let bit = (byte >> i & 0x1);
            bits += bit;
        }

        bits += " ";
    }

    var bitsEncodedEl = document.getElementById("bits-encoded");
    bitsEncodedEl.innerHTML = bits;

    ctx.putImageData(imageData, 0, 0);

}