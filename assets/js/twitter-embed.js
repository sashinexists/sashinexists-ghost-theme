var widgetCSS = `
    body{font-family: "Ubuntu";transition:.3s; width:75%; margin:auto;}
    a{color:#52aa5e;transition:.3s;}
    blockquote{font-size:2rem;font-weight:400;}
    .timeline-Widget{border-radius:1rem; outline: #171717; border: none; margin: auto;transition:.3s;}
    .timeline-Header{background-color: #1f1f1f; border-top-left-radius: 1rem; border-top-right-radius: 1rem; text-align:center;transition:.3s;}
    .timeline-Header-title{color: #e9e9e9; text-align: center;transition:.3s;}
    .timeline-Tweet-text{color: #aaa;transition:.3s;}
    .timeline-tweetList-tweet, .timeline-LoadMore, .timeline-Footer{background-color: #0f0f0f;transition:.3s;}
    .TweetAuthor-name{color:#aaa;transition:.3s;}
    `;

var tweetCSS = `
"font-family:Ubuntu;"
`;

function paint() {
    var w = document.getElementById("twitter-widget-0").contentDocument;
    var s = document.createElement("style");
    s.innerHTML = widgetCSS;
    s.type = "text/css";
    w.head.appendChild(s);
}

function paintTweet() {
    var w = document.getElementById("twitter-widget-0");
    w.style = tweetCSS;
}