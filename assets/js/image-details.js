const POPUP = document.querySelector(".popup");
const IMG_DETAILS = document.querySelector(".image-details");
const SCREEN = document.querySelector(".screen");
const CLOSE_BUTTON = document.querySelector(".close-button");
const IMAGE_SOURCE_BUTTON = document.querySelector(".image-source-btn");
const ARTIST_BUTTON = document.querySelector(".artist-btn");
let artistCode, artistLink, sourceLink;


IMG_DETAILS.addEventListener("click", showImageDetails);

SCREEN.addEventListener("click", hideImageDetails);
CLOSE_BUTTON.addEventListener("click", hideImageDetails);

function showImageDetails() {
    POPUP.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function hideImageDetails() {
    POPUP.classList.add("hide");
    SCREEN.classList.add("hide");
}

ARTIST_BUTTON.setAttribute("href", `${getArtistLink()}`);
IMAGE_SOURCE_BUTTON.setAttribute("href", `${getSourceLink()}`);

function getArtistLink() {
    if (ARTIST_BUTTON.id.slice(12, 18) === "flickr") {
        artistCode = ARTIST_BUTTON.id.slice(19);
        return `https://flickr.com/photos/${artistCode}`;
    } else if (ARTIST_BUTTON.id.slice(12, 20) === "unsplash") {
        artistCode = ARTIST_BUTTON.id.slice(21);
        return `https://unsplash.com/${artistCode}`;
    } else {
        return ARTIST_BUTTON.id.slice(12);
    }
}

function getSourceLink() {
    if (IMAGE_SOURCE_BUTTON.id.slice(12, 18) === "flickr") {
        return `https://flickr.com/photos/${artistCode}/${IMAGE_SOURCE_BUTTON.id.slice(19)}`;
    } else if (IMAGE_SOURCE_BUTTON.id.slice(12, 20) === "unsplash") {
        return `https://unsplash.com/photos/${IMAGE_SOURCE_BUTTON.id.slice(21)}`;;
    } else {
        return IMAGE_SOURCE_BUTTON.id.slice(12);
    }
}