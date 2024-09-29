// Create the button element
const style = document.createElement("style");
style.textContent = `
.button-64 {
  align-items: center;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
  border: 0;
  border-radius: 8px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-family: Phantomsans, sans-serif;
  font-size: 20px;
  justify-content: center;
  line-height: 1em;
  max-width: 100%;
  min-width: 140px;
  padding: 3px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}

.button-64:active,
.button-64:hover {
  outline: 0;
}

.button-64 span {
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}

.button-64:hover span {
  background: none;
}

@media (min-width: 768px) {
  .button-64 {
    font-size: 24px;
    min-width: 196px;
  }
}
`;
document.head.appendChild(style);

const span = document.createElement("span");
span.textContent = "Open in Mulebuy";

const button = document.createElement("button");
button.className = "button-64";
button.style.position = "fixed";
button.style.bottom = "20px";
button.style.right = "20px";
button.style.zIndex = "1000";
button.appendChild(span);

// Append the button to the body
document.body.appendChild(button);

function getMatchingKeywordFromUrl() {
  const keywords = ["taobao", "weidian", "1688"];
  const currentUrl = window.location.href.toLowerCase(); // Convert URL to lowercase for case-insensitive comparison

  const matchingKeyword = keywords.find((keyword) =>
    currentUrl.includes(keyword)
  );

  if (matchingKeyword === "1688") {
    const regex = /\/offer\/(\d+)\.html/;
    const match = currentUrl.match(regex);

    if (match && match[1]) {
      const id = match[1];
    } else {
      return null;
    }

    // Modify the matching keyword if it's "1688"
    if (matchingKeyword === "1688") {
      return "ali_" + matchingKeyword + "&id=" + id;
    }

    // Return the matching keyword or null if none found
    return matchingKeyword || null;
  }

  if (matchingKeyword === "weidian") {
    const parsedUrl = new URL(window.location.href);

    // Get the value of the 'itemID' parameter from the URL
    const itemId = parsedUrl.searchParams.get("itemID");
    if (itemId) {
      return matchingKeyword + "&id=" + itemId;
    } else {
      return null;
    }
  }

  if (matchingKeyword === "taobao") {
    const parsedUrl = new URL(window.location.href);

    // Get the value of the 'itemID' parameter from the URL
    const id = parsedUrl.searchParams.get("id");
    if (id) {
      return matchingKeyword + "&id=" + id;
    } else {
      return null;
    }
  }
}

// Add event listener to the button
button.addEventListener("click", () => {
  let item_link = getMatchingKeywordFromUrl();

  if (item_link !== null) {
    // Send the extracted ID to the background script
    chrome.runtime.sendMessage({
      action: "copyId",
      item_link: item_link,
    });
  } else {
    alert("No valid ID found in the URL");
  }
});
