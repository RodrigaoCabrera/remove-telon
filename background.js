chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.method === "getState") {
    chrome.storage.sync.get(["remove-telon"], function (result) {
      sendResponse({ state: result["remove-telon"] });
    });
    return true;
  }
});
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    (changeInfo.status === "complete" &&
      tab.active &&
      tab.url.includes("http://")) ||
    tab.url.includes("https://")
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["contentScript.js"],
    });
  }
});
