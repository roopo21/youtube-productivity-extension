chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getStorage") {
      chrome.storage.local.get(["blockComments", "blockShorts", "blockDiscovery"], (data) => {
        sendResponse(data);
      });
      return true; 
    }
  });