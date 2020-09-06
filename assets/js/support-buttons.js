const POPUP = document.querySelector(".popup");
const ETH_BUTTON = document.querySelector(".send-ethereum");
const BTC_BUTTON = document.querySelector(".send-bitcoin");
const ETH_ADDRESS_BOX = document.querySelector(".eth-address-box");
const BTC_ADDRESS_BOX = document.querySelector(".btc-address-box");
const CLOSE_BUTTON = document.querySelector(".close-button");
const SCREEN = document.querySelector(".screen");
const ETH_ADDRESS_FIELD = document.querySelector("#eth-address");
const BTC_ADDRESS_FIELD = document.querySelector("#btc-address");
const COPY_BTC_BUTTON = document.querySelector(".copy-btc-address");
const COPY_ETH_BUTTON = document.querySelector(".copy-eth-address");

const COPY_ETH_LABEL = document.querySelector(".copy-eth-address-label");
const COPY_BTC_LABEL = document.querySelector(".copy-btc-address-label");

const COPY_ETH_ICON = document.querySelector(".copy-eth-icon");
const COPY_BTC_ICON = document.querySelector(".copy-btc-icon");

ETH_BUTTON.addEventListener("click", showEthAddress);
BTC_BUTTON.addEventListener("click", showBTCAddress);
SCREEN.addEventListener("click", closePopup);
CLOSE_BUTTON.addEventListener("click", closePopup);
COPY_BTC_BUTTON.addEventListener("click", copyBTC);
COPY_ETH_BUTTON.addEventListener("click", copyEth);


function hideEthAddress() {
    ETH_ADDRESS_BOX.classList.add("hide");
}

function showEthAddress() {
    POPUP.classList.remove("hide");
    ETH_ADDRESS_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function hideBTCAddress() {
    BTC_ADDRESS_BOX.classList.add("hide");
}

function showBTCAddress() {
    POPUP.classList.remove("hide");
    BTC_ADDRESS_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function closePopup() {
    hideEthAddress();
    hideBTCAddress();
    SCREEN.classList.add("hide");
    POPUP.classList.add("hide");
    updateButtonLabel(COPY_BTC_LABEL, "Copy Address");
    updateButtonLabel(COPY_ETH_LABEL, "Copy Address");
    updateButtonIcon(COPY_BTC_ICON, "fa-check-circle", "fa-copy");
    updateButtonIcon(COPY_ETH_ICON, "fa-check-circle", "fa-copy");
}

function copyEth() {
    ETH_ADDRESS_FIELD.select();
    ETH_ADDRESS_FIELD.setSelectionRange(0, 99999);
    document.execCommand("copy");
    updateButtonLabel(COPY_ETH_LABEL, "Copied");
    updateButtonIcon(COPY_ETH_ICON, "fa-copy", "fa-check-circle")
}

function copyBTC() {
    BTC_ADDRESS_FIELD.select();
    BTC_ADDRESS_FIELD.setSelectionRange(0, 99999);
    document.execCommand("copy");
    updateButtonLabel(COPY_BTC_LABEL, "Copied");
    updateButtonIcon(COPY_BTC_ICON, "fa-copy", "fa-check-circle")
}

function updateButtonIcon(label, from, to) {
    label.classList.remove(from);
    label.classList.add(to);
}

function updateButtonLabel(label, text) {
    label.innerHTML = text;
}