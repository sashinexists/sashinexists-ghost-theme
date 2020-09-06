const BUY_MERCH = document.querySelector(".buy-merchandise");
const BUY_MERCH_DEVICE = document.querySelector(".buy-merchandise-device");
const STORE_POPUP = document.querySelector(".store-popup");
const STORE_CLOSE = document.querySelector(".store-close");
const LEAVE_STORE = document.querySelector(".leave-store");

BUY_MERCH.addEventListener("click", goToStore);
if (BUY_MERCH_DEVICE) {
    BUY_MERCH_DEVICE.addEventListener("click", goToStore);
}

STORE_CLOSE.addEventListener("click", closeStore);
LEAVE_STORE.addEventListener("click", closeStore);

function goToStore() {
    STORE_POPUP.classList.remove("hide");
    LEAVE_STORE.classList.remove("hide");
    console.log("Detected!");
}

function closeStore() {
    STORE_POPUP.classList.add("hide");
    LEAVE_STORE.classList.add("hide");
}

