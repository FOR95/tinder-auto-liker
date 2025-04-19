// Reset totalLikes on install or on browser startup
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ totalLikes: 0 });
});
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ totalLikes: 0 });
});

// Inject content script on tab updates for SPA
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /https?:\/\/([^/]+\.)?tinder\.com/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        });
    }
});
