// background.js

// Setze Status bei Installation zurück
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    enabled: false,
    manualStart: false,
    preset: ""
  });
});

// Setze Status bei vollständigem Chrome-Neustart zurück
chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.set({
    enabled: false,
    manualStart: false,
    preset: ""
  });
});

// Überwache Tab-Schließung: wenn keine Tinder-Tabs mehr offen → alles zurücksetzen
chrome.tabs.onRemoved.addListener(() => {
  chrome.tabs.query({ url: "*://*.tinder.com/*" }, (tabs) => {
    if (tabs.length === 0) {
      chrome.storage.sync.set({
        enabled: false,
        manualStart: false,
        preset: ""
      });
      console.log("[AutoLiker] Alle Tinder-Tabs geschlossen → Auto-Liker deaktiviert & Preset zurückgesetzt.");
    }
  });
});
