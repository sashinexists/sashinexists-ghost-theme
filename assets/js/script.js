const SEARCH_API_KEY = window.env.GhostSearchAPI; // should be in document for production, on your local ghost install for development
const SEARCH_API_KEY_QUOTES = window.env.GhostSearchAPI_secondary; // should be in document for production, on your local ghost install for development
const SEARCH_API_KEY_RECOMMENDED = SEARCH_API_KEY_QUOTES;


let searchinGhost = new SearchinGhost({
    key: SEARCH_API_KEY,
    template: function (result) {
        if (result.tags[1].name === "Book") {
            return BOOK_RESULT_TEMPLATE(result);
        } else if (result.tags[0].name === "Quote") {
            return QUOTE_RESULT_TEMPLATE(result);
        } else if (result.tags[0].name === "Letter") {
            return LETTER_RESULT_TEMPLATE(result);
        }
        return SEARCH_RESULT_TEMPLATE(result);
    },
    emptyTemplate: function () {
        return NO_RESULT_TEMPLATE();
    },
    customProcessing: function (result) {
        if (result.tags) {
            result.string_tags = result.tags.map(o => o.name).join(' ').toLowerCase();
            result.filter_tag = result.tags[0].name;
        }
        if (result.feature_image) result.feature_image = result.feature_image.replace('/images/', '/images/size/w1000/');
        return result;
    },
    date: {
        locale: "en-GB",
        options: { year: 'numeric', month: 'long', day: 'numeric' }
    },
    onSearchEnd: function () {
        RENDER_SEARCH();
        if (SEARCH_BAR.value.length === 0) {
            document.querySelector(".no-search-results").classList.add("hide");
        }
        setTimeout(RENDER_SEARCH, 1000); //Additional renders fix book cover display bugs
        setTimeout(RENDER_SEARCH, 3000);
        setTimeout(RENDER_SEARCH, 5000);
    }
}
);
const QUOTES_SEARCH_BAR = document.querySelector("#search-quotes") || false;
const QUOTES_SEARCH_BAR_DEVICE = document.querySelector("#search-quotes-device") || false;

QUOTES_SEARCH_BAR ? QUOTES_SEARCH_BAR.addEventListener("input", function () { syncDeviceSearch(QUOTES_SEARCH_BAR, QUOTES_SEARCH_BAR_DEVICE) }) : false;
QUOTES_SEARCH_BAR_DEVICE ? QUOTES_SEARCH_BAR_DEVICE.addEventListener("input", function () { syncDesktopSearch(QUOTES_SEARCH_BAR, QUOTES_SEARCH_BAR_DEVICE) }) : false;

const RECOMMENDED_SEARCH_BAR = document.querySelector("#search-recommended") || false;
const RECOMMENDED_SEARCH_BAR_DEVICE = document.querySelector("#search-recommended-device") || false;

RECOMMENDED_SEARCH_BAR ? RECOMMENDED_SEARCH_BAR.addEventListener("input", function() {syncDeviceSearch(RECOMMENDED_SEARCH_BAR, RECOMMENDED_SEARCH_BAR_DEVICE)}) : false;
RECOMMENDED_SEARCH_BAR_DEVICE ? RECOMMENDED_SEARCH_BAR_DEVICE.addEventListener("input", function() {syncDesktopSearch(RECOMMENDED_SEARCH_BAR, RECOMMENDED_SEARCH_BAR_DEVICE)}) : false;


function syncDeviceSearch(desktop, device) {
    device.value = desktop.value;
}

function syncDesktopSearch(desktop, device) {
    desktop.value = device.value;
}


let searchQuotes = initQuoteSearch();
let searchRecommended = initRecommendedSearch();


const SEARCH_BUTTON = document.querySelector(".search-button");
const MENU_BUTTON = document.querySelector(".js-menu-button");
const MAIN = document.querySelector("main");

SEARCH_BUTTON.addEventListener("click", toggleSearchBar);
MENU_BUTTON.addEventListener("click", toggleDeviceMenu);

const NAV = document.querySelector(".js-nav-hide");
const GHOST_SEARCH_FIELD = document.querySelector(".ghost-search-field");
const SEARCH_BAR = document.querySelector(".search-bar");
const SEARCH_ICON = document.querySelector(".search-icon");
const RESULTS_FIELD = document.querySelector(".results-field");



SEARCH_BAR.addEventListener("input", toggleHideMainContent);



const DEVICE_MENU = document.querySelector(".js-device-nav");

const BACK_TO_TOP = document.querySelector(".back-to-top-button");

BACK_TO_TOP.addEventListener("click", scrollToTop);



let deviceMenuActive = false;
let searchResultsActive = false;

SEARCH_BAR.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) && searchResultsActive) {
        closeSearch();
    }
});

function toggleDeviceMenu() {
    if (!deviceMenuActive) {
        closeSearch();
        openDeviceMenu();
    } else {
        closeDeviceMenu();
    }
}

function toggleSearchBar() {
    if (!searchResultsActive) {
        openSearch();
        closeDeviceMenu();
    } else {
        closeSearch();
    }
}


function toggleHideMainContent() {
    SEARCH_BAR.value.length > 0 ? MAIN.classList.add("hide") : MAIN.classList.remove("hide");
}

function openSearch() {
    GHOST_SEARCH_FIELD.classList.remove("hide");
    NAV.classList.add("hide");
    RESULTS_FIELD.classList.add("ghost-search-results");
    RESULTS_FIELD.classList.remove("hide");
    SEARCH_BAR.focus();
    SEARCH_ICON.classList.remove("fa-search");
    SEARCH_ICON.classList.add("fa-times-circle");
    searchResultsActive = true;
}

function closeSearch() {
    GHOST_SEARCH_FIELD.classList.add("hide");
    NAV.classList.remove("hide");
    RESULTS_FIELD.classList.remove("ghost-search-results");
    RESULTS_FIELD.classList.add("hide");
    RESULTS_FIELD.innerHTML = "";
    searchResultsActive = false;
    SEARCH_BAR.value = null;
    SEARCH_ICON.classList.remove("fa-times-circle");
    SEARCH_ICON.classList.add("fa-search");
    toggleHideMainContent();
}

function openDeviceMenu() {
    DEVICE_MENU.classList.remove("hide");
    MAIN.classList.add("hide");
    deviceMenuActive = true;
}

function closeDeviceMenu() {
    DEVICE_MENU.classList.add("hide");
    MAIN.classList.remove("hide");
    deviceMenuActive = false;
}

window.onscroll = function () { displayBackToTopButton(); };

function displayBackToTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        BACK_TO_TOP.style.opacity = "1";
    } else {
        BACK_TO_TOP.style.opacity = ".3";
    }
}

function scrollToTop() {
    if (window.scroll) {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For IE and similar
    }
}

function initQuoteSearch() {
    if (QUOTES_SEARCH_BAR) {
        return new SearchinGhost({
            key: SEARCH_API_KEY_QUOTES,
            inputId: ['search-quotes', 'search-quotes-device'],
            outputId: ['quote-results'],
            template: function (result) {
                return QUOTE_CARD_TEMPLATE(result);
            },
            emptyTemplate: function () {
                return NO_QUOTES_CARD_TEMPLATE();
            },
            customProcessing: function (result) {
                if (result.tags) {
                    result.string_tags = result.tags.map(o => o.name).join(' ').toLowerCase();
                    result.filter_tag = result.tags[0].name;
                }
                if (result.feature_image) result.feature_image = result.feature_image.replace('/images/', '/images/size/w1000/');
                return result;
            },
            date: {
                locale: "en-GB",
                options: { year: 'numeric', month: 'long', day: 'numeric' }
            },
            onSearchStart: function (result) {
                if (QUOTES_SEARCH_BAR.value.length !== 0 || QUOTES_SEARCH_BAR_DEVICE.value.length !== 0) {
                    document.querySelector("#quote-display").classList.add("hide");
                    document.querySelector("#quote-results").classList.remove("hide");
                }
            },
            onSearchEnd: function (result) {
                if (QUOTES_SEARCH_BAR.value.length === 0 && QUOTES_SEARCH_BAR_DEVICE.value.length === 0) {
                    document.querySelector("#quote-display").classList.remove("hide");
                    document.querySelector("#quote-results").classList.add("hide");
                }
            },
            searchOptions: {
                where: {
                    filter_tag: "Quote"
                }
            }
        }
        );
    }
    return false;
}

function initRecommendedSearch() {
    if (RECOMMENDED_SEARCH_BAR) {
        return new SearchinGhost({
            key: SEARCH_API_KEY_RECOMMENDED,
            inputId: ['search-recommended', 'search-recommended-device'],
            outputId: ['recommended-results'],
            template: function (result) {
                return BOOK_CARD_TEMPLATE(result);
            },
            emptyTemplate: function () {
                return NO_RECOMMENDATIONS_CARD_TEMPLATE();
            },
            customProcessing: function (result) {
                if (result.tags) {
                    result.string_tags = result.tags.map(o => o.name).join(' ').toLowerCase();
                    result.filter_tag = result.tags[0].name;
                }
                if (result.feature_image) result.feature_image = result.feature_image.replace('/images/', '/images/size/w1000/');
                return result;
            },
            date: {
                locale: "en-GB",
                options: { year: 'numeric', month: 'long', day: 'numeric' }
            },
            onSearchStart: function (result) {
                if (RECOMMENDED_SEARCH_BAR.value.length !== 0 || RECOMMENDED_SEARCH_BAR_DEVICE.value.length !== 0) {
                    document.querySelector("#recommended-display").classList.add("hide");
                    document.querySelector("#recommended-results").classList.remove("hide");
                }
            },
            onSearchEnd: function (result) {
                RENDER_SEARCH();
                if (RECOMMENDED_SEARCH_BAR.value.length === 0 && RECOMMENDED_SEARCH_BAR_DEVICE.value.length === 0) {
                    document.querySelector("#recommended-display").classList.remove("hide");
                    document.querySelector("#recommended-results").classList.add("hide");
                }
                setTimeout(RENDER_SEARCH, 1000); //Additional renders fix book cover display bugs
                setTimeout(RENDER_SEARCH, 3000);
                setTimeout(RENDER_SEARCH, 5000);
            },
            searchOptions: {
                where: {
                    filter_tag: "Recommended"
                }
            }
        }
        );
    }
    return false;
}


// SEARCH TEMPLATE FUNCTIONS

function makeDateOrdinal(date) {
    const DAY = date.split(" ")[0];
    let digit = DAY.length === 1 ? DAY[0] : DAY[1];
    digit = Number(digit);
    let ordinalString;
    switch (digit) {
        case 1:
            ordinalString = "st";
            break;
        case 2:
            ordinalString = "nd";
            break;
        case 3:
            ordinalString = "rd";
            break;
        default:
            ordinalString = "th";
    }
    date = date.split(" ");
    return `${date[0]}${ordinalString} ${date[1]} ${date[2]}`
}

const SEARCH_RESULT_TEMPLATE = (result) => {
    if (result.custom_excerpt) {
        result.excerpt = result.custom_excerpt;
    }
    return `
      <a class="post-preview-link search-preview" href="${result.url}">
          <article class="post-preview">
              <header class="post-preview-header">
                  <h1 class="post-preview-title"><span class="post-preview-title" href="${result.url}">${result.title}</span></h1>
                  <section class="post-preview-meta">
                      <time class="post-preview-meta-date" datetime="${result.published_at}" format="Do MMMM YYYY">${makeDateOrdinal(result.published_at)}</time>
                  </section>
  
  
              </header>
  
              <figure class="post-preview-image" style="background-image: url(${result.feature_image})">
              </figure>
  
              <section class="post-preview-excerpt"><p>${result.excerpt.slice(0, 300).trim()}...</p></section> 
  
              <footer class="post-preview-footer">
                  <span href="${result.url}" class="read-article">
                      <span>Read</span>
                      <i class="fas fa-book-open"></i>
                  </span>
              </footer>
          </article>
      </a>
      `
}

const LETTER_RESULT_TEMPLATE = (result) => {
    return `
      <a class="post-preview-link search-preview" href="${result.url}">
          <article class="post-preview">
              <header class="post-preview-header">
                  <h1 class="post-preview-title"><span class="post-preview-title" href="${result.url}">${result.title}</span></h1>
                  <section class="post-preview-meta">
                      Sent <time class="post-preview-meta-date" datetime="${result.published_at}" format="Do MMMM YYYY">${makeDateOrdinal(result.published_at)}</time>
                      <i class="fas fa-envelope-open"></i>
                  </section>
  
  
              </header>
  
              <figure class="post-preview-image" style="background-image: url(${result.feature_image})">
              </figure>
  
              <section class="post-preview-excerpt"><p>${result.excerpt.slice(0, 300).trim()}...</p></section> 
  
              <footer class="post-preview-footer">
              <span href=${result.url} class="read-article">
                <span>Read letter</span>
                <i class="fas fa-file-alt"></i>
              </span>
              </footer>
          </article>
      </a>
      `
}

const BOOK_RESULT_TEMPLATE = (result) => {
    return `
    <a class="book-preview-link search-preview" href="${result.url}">
      <article class="book-preview">
        <header class="book-preview-header">
          <h1 class="book-preview-title desktop-only">Book Recommendation</h1>
          <i class="fas fa-book book-icon"></i>
        </header>
        <span class="book book-search-result" id="${result.tags[result.tags.length - 2].name}">
          <i class="load-icon fas fa-spinner"></i>
        </span>
        <footer class="book-preview-footer">
          <span href="${result.url}" class="read-article">
              <span>More</span>
              <i class="fas fa-book-open"></i>
          </span>
        </footer>
      </article>
    </a>
    `
}

const QUOTE_RESULT_TEMPLATE = (result) => {
    return `
      <a href="${result.url}" class="quote-preview-link">
        <article class="quote-preview search-preview">
        <header class="quote-full-header">
            <h1 class="quote-full-title">Quote</h1>
            <i class="fas fa-comment-alt quote-icon"></i>        
        </header>
    
        <blockquote class="quote-search-preview">
            <span class="quote-content">
                <i class="fas fa-quote-left quote-left"></i>
                ${result.excerpt}
                <i class="fas fa-quote-right quote-right"></i>
            </span>
            <h6 class="quote-author">${result.tags[1].name}</h6>
        </blockquote>
    
      </article>
    </a>
      `
}


const NO_RESULT_TEMPLATE = () => `<section class="post-full no-search-results">
  <header class="book-full-header">
      <h1 class="book-full-title">No search results found <i style="margin-left:.6rem;" class="fas fa-grin-beam-sweat"></i></h1>
      <i class="fas fa-binoculars"></i>
  </header>
  
  <section class="post-full-content">
      <div class="post-content">
          <p>You tried your best but alas to no avail, <em>you have not been fruitful in your search.</em></p>
          <p>Please refine your search terms and try again.</p>
          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=W1i4mTyidOc" class="post-preview-link">
          <figure class="kg-card kg-embed-card kg-card-hascaption" id="stay-determined">
          <blockquote><i style="font-size:5rem;" class="far fa-fire-alt flame-of-determination"></i></blockquote>
          <figcaption>Stay Determined.</figcaption>
          </figure>
          </a>
      </div>
  </section>`

const QUOTE_CARD_TEMPLATE = (result) => {
    return `
    <a href="${result.url}" class="quote-card">
        <article class="quote-preview">
            <blockquote class="quote-card-preview">
                <span class="quote-content-home">
                    <i class="fas fa-quote-left quote-left"></i>
                    ${result.excerpt}
                    <i class="fas fa-quote-right quote-right"></i>
                </span>
                <h6 class="quote-author">${result.tags[1].name}</h6>
            </blockquote>
        </article>
    </a>
      `
}

const BOOK_CARD_TEMPLATE = (result) => {
    return `
    <a class="quote-card book-card" href="${result.url}">
        <article class="book-preview-card">
            <header class="book-preview-header">
                <h1 class="book-preview-title desktop-only">Book Recommendation</h1>
                <i class="fas fa-book book-icon"></i>
            </header>
            <span class="book book-search-card" id="${result.tags[result.tags.length - 2].name}">
                <i class="load-icon fas fa-spinner"></i>
            </span>
            <footer class="book-preview-footer">
                <span href="${result.url}" class="read-article">
                    <span>More</span>
                    <i class="fas fa-book-open"></i>
                </span>
            </footer>
        </article>
    </a>
    `
}

const NO_QUOTES_CARD_TEMPLATE = () => `<section class="big-card post-full no-search-results">
  <header class="book-full-header">
      <h1 class="book-full-title">No quotes found <i style="margin-left:.6rem;" class="fas fa-grin-beam-sweat"></i></h1>
      <i class="fas fa-binoculars"></i>
  </header>
  
  <section class="post-full-content">
      <div class="post-content">
      <p>Please refine your search terms and try again.</p>

        <a href="https://www.youtube.com/watch?v=YkgkThdzX-8" class="quote-card null-result">
            <article class="quote-preview">
                <blockquote class="quote-card-preview">
                    <span class="quote-content-home">
                        <i class="fas fa-quote-left quote-left"></i>
                        If you have too many quotes from other people in your head, you can't create. You have to keep your head empty. That's why I am constantly enjoying the sky, the park, the walk.
                        <i class="fas fa-quote-right quote-right"></i>
                    </span>
                    <h6 class="quote-author">Yoko Ono</h6>
                </blockquote>
            </article>
        </a>
      </div>
  </section>`

const NO_RECOMMENDATIONS_CARD_TEMPLATE = () => `<section class="big-card post-full no-search-results">
  <header class="book-full-header">
      <h1 class="book-full-title">No recommendations found<i style="margin-left:.6rem;" class="fas fa-grin-beam-sweat"></i></h1>
      <i class="fas fa-binoculars"></i>
  </header>
  
  <section class="post-full-content">
      <div class="post-content">
      <p>Please refine your search terms and try again.</p>

        <a href="https://www.youtube.com/watch?v=dVG5dD41bpo&list=PL7jrSVbKQc3R08KF5iGhqKC8neriKHqRJ" class="quote-card null-result">
            <article class="quote-preview">
                <blockquote class="quote-card-preview">
                    <span class="quote-content-home">
                        <i class="fab fa-youtube"></i>
                        Click here to watch a secret recommendation.
                        <i class="fas fa-video"></i>
                    </span>
                    <h6 class="quote-author">Please forgive the extremely poor production quality.</h6>
                </blockquote>
            </article>
        </a>
      </div>
  </section>`

