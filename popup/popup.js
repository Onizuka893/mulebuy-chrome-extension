document.getElementById("copyUrl").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let currentUrl = tabs[0].url;

    // Extract the ID from the URL
    let regex = /\/offer\/(\d+)\.html/;
    let match = currentUrl.match(regex);

    if (match && match[1]) {
      let id = match[1];
      chrome.runtime.sendMessage({ action: "copyId", id: id });
    } else {
      alert("No valid ID found in the URL");
    }
  });
});
