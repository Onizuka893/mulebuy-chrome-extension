chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "copyId") {
    const targetWebsites = [
      "https://mulebuy.com/product/?shop_type=weidian&id=",
      "https://mulebuy.com/product/?shop_type=ali_1688&id=",
      "https://mulebuy.com/product/?shop_type=taobao&id=",
    ];
    // Replace with the target website where the ID will be pasted
    const targetWebsite =
      "https://mulebuy.com/product/?shop_type=" + message.item_link;

    // Open a new tab with the target website and the extracted ID
    chrome.tabs.create({ url: targetWebsite });
  }
});
