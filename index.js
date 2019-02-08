const pixelmatch = require("pixelmatch");

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

    var diffCanvas = document.getElementById("diff-canvas");
    diffCanvas.width = data.width;
    diffCanvas.height = data.height;
    diffCanvas.style.width = image.width + "px";
    diffCanvas.style.height = image.height + "px";
    
    var ctx = destCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    var diffCtx = diffCanvas.getContext("2d");

    var sourceImageData = ctx.getImageData(0, 0, destCanvas.width, destCanvas.height);
    var destImageData = ctx.getImageData(0, 0, destCanvas.width, destCanvas.height);
    var diffImageData = ctx.createImageData(destCanvas.width, destCanvas.height);

    var data = destImageData.data;

    let bits = "";

    let index = 0;
    for (let byte of encodedData) {
        for (let i=0; i<8; i++) {
            let bit = (byte >> i & 0x1);
            bits += bit;

            let colorByte = data[index];
            let colorByteAltered = (colorByte & 0xFE) | bit;
            data[index] = 0;
            console.log(index + " " + colorByte + " " + colorByteAltered);

            index++;
        }

        bits += " ";
    }

    var numBits = index - 1;
    console.log(`Required ${numBits}.`);

    var bitsEncodedEl = document.getElementById("bits-encoded");
    bitsEncodedEl.innerHTML = bits;
    
    pixelmatch(sourceImageData, destImageData, diffImageData, destCanvas.width, destCanvas.height, {
        threshold: 0,
        includeAA: false
    });

    ctx.putImageData(destImageData, 0, 0);
    diffCtx.putImageData(diffImageData, 0, 0);    
}