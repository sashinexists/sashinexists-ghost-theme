const RENDER_QUOTE_BUTTONS = () => {
    const BUY_MERCH = document.querySelector(".buy-merchandise");
    BUY_MERCH.setAttribute("href",`https://bit.ly/${BUY_MERCH.id.slice(7)}`);

    const ABOUT_AUTHOR = document.querySelector(".about-author");
    ABOUT_AUTHOR.setAttribute("href", `/tag/${ABOUT_AUTHOR.id.toLowerCase().split(" ").join("-")}`);
}