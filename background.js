// background.js

// Reset everything on install
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ enabled: false, manualStart: false });
  });
  
  // Reset on full browser restart
  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.sync.set({ enabled: false, manualStart: false });
  });
  
  // Disable auto-liker when all Tinder tabs are closed
  chrome.tabs.onRemoved.addListener(() => {
    chrome.tabs.query({ url: "*://*.tinder.com/*" }, (tabs) => {
      if (tabs.length === 0) {
        chrome.storage.sync.set({ enabled: false, manualStart: false });
        console.log("[AutoLiker] All Tinder tabs closed. Stopping auto-liker.");
      }
    });
  });
  