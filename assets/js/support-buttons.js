const POPUP = document.querySelector(".popup");
const ETH_BUTTON = document.querySelector(".send-ethereum");
const SOL_BUTTON = document.querySelector(".send-solana");
const ADA_BUTTON = document.querySelector(".send-cardano");
const ETH_ADDRESS_BOX = document.querySelector(".eth-address-box");
const SOL_ADDRESS_BOX = document.querySelector(".sol-address-box");
const ADA_ADDRESS_BOX = document.querySelector(".ada-address-box");
const CLOSE_BUTTON = document.querySelector(".close-button");
const SCREEN = document.querySelector(".screen");
const ETH_ADDRESS_FIELD = document.querySelector("#eth-address");
const SOL_ADDRESS_FIELD = document.querySelector("#sol-address");
const ADA_ADDRESS_FIELD = document.querySelector("#ada-address");
const COPY_SOL_BUTTON = document.querySelector(".copy-sol-address");
const COPY_ETH_BUTTON = document.querySelector(".copy-eth-address");
const COPY_ADA_BUTTON = document.querySelector(".copy-ada-address");

const COPY_ETH_LABEL = document.querySelector(".copy-eth-address-label");
const COPY_SOL_LABEL = document.querySelector(".copy-sol-address-label");
const COPY_ADA_LABEL = document.querySelector(".copy-ada-address-label");


const COPY_ETH_ICON = document.querySelector(".copy-eth-icon");
const COPY_SOL_ICON = document.querySelector(".copy-sol-icon");
const COPY_ADA_ICON = document.querySelector(".copy-ada-icon");


const BUY_MERCH_BOX = document.querySelector(".buy-merch-popup");


const BUY_MERCH = document.querySelector(".buy-merchandise");


ETH_BUTTON.addEventListener("click", showEthAddress);
SOL_BUTTON.addEventListener("click", showSOLAddress);
ADA_BUTTON.addEventListener("click", showADAAddress);
SCREEN.addEventListener("click", closePopup);
CLOSE_BUTTON.addEventListener("click", closePopup);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closePopup();
    } 
});
COPY_SOL_BUTTON.addEventListener("click", copySOL);
COPY_ETH_BUTTON.addEventListener("click", copyETH);
COPY_ADA_BUTTON.addEventListener("click", copyADA);
BUY_MERCH.addEventListener("click", showStoreLink);


function hideStoreLink() {
    BUY_MERCH_BOX.classList.add("hide");
}

function showStoreLink() {
    POPUP.classList.remove("hide");
    BUY_MERCH_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}


function hideEthAddress() {
    ETH_ADDRESS_BOX.classList.add("hide");
}

function showEthAddress() {
    POPUP.classList.remove("hide");
    ETH_ADDRESS_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function hideSOLAddress() {
    SOL_ADDRESS_BOX.classList.add("hide");
}

function showSOLAddress() {
    POPUP.classList.remove("hide");
    SOL_ADDRESS_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function hideADAAddress() {
    ADA_ADDRESS_BOX.classList.add("hide");
}

function showADAAddress() {
    POPUP.classList.remove("hide");
    ADA_ADDRESS_BOX.classList.remove("hide");
    SCREEN.classList.remove("hide");
}

function closePopup() {
    hideEthAddress();
    hideSOLAddress();
    hideADAAddress();
    hideStoreLink();
    SCREEN.classList.add("hide");
    POPUP.classList.add("hide");
    updateButtonLabel(COPY_SOL_LABEL, "Copy Address");
    updateButtonLabel(COPY_ETH_LABEL, "Copy Address");
    updateButtonIcon(COPY_SOL_ICON, "fa-check-circle", "fa-copy");
    updateButtonIcon(COPY_ETH_ICON, "fa-check-circle", "fa-copy");
}

function copyETH() {
    ETH_ADDRESS_FIELD.select();
    ETH_ADDRESS_FIELD.setSelectionRange(0, 99999);
    document.execCommand("copy");
    updateButtonLabel(COPY_ETH_LABEL, "Copied");
    updateButtonIcon(COPY_ETH_ICON, "fa-copy", "fa-check-circle")
}

function copySOL() {
    SOL_ADDRESS_FIELD.select();
    SOL_ADDRESS_FIELD.setSelectionRange(0, 99999);
    document.execCommand("copy");
    updateButtonLabel(COPY_SOL_LABEL, "Copied");
    updateButtonIcon(COPY_SOL_ICON, "fa-copy", "fa-check-circle")
}

function copyADA() {
    ADA_ADDRESS_FIELD.select();
    ADA_ADDRESS_FIELD.setSelectionRange(0, 99999);
    document.execCommand("copy");
    updateButtonLabel(COPY_ADA_LABEL, "Copied");
    updateButtonIcon(COPY_ADA_ICON, "fa-copy", "fa-check-circle")
}

function updateButtonIcon(label, from, to) {
    label.classList.remove(from);
    label.classList.add(to);
}

function updateButtonLabel(label, text) {
    label.innerHTML = text;
}

