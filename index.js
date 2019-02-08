function getRandomImageURL() {
    return "https://source.unsplash.com/random/800x600";
}

// Load image
var sourceImage = document.getElementById("source-image");
sourceImage.src = getRandomImageURL();
