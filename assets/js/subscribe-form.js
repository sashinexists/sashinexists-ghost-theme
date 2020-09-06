const POPUP = document.querySelector(".popup");
const SUBSCRIBE = document.querySelector("#subscribe");
const SCREEN = document.querySelector(".screen");
const CLOSE_BUTTON = document.querySelector(".close-button");

SUBSCRIBE.addEventListener("submit", showPopup);

SCREEN.addEventListener("click", hidePopup);
CLOSE_BUTTON.addEventListener("click", hidePopup);

function showPopup() {
    POPUP.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function hidePopup() {
    POPUP.classList.add("hide");
    SCREEN.classList.add("hide");
}