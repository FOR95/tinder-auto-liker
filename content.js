// content.js

(function () {
    if (window.__tinderAutoLikerInit) return;
    window.__tinderAutoLikerInit = true;
  
    let intervalId = null;
    let stopTimeout = null;
  
    function clickLikeButton() {
      const btn = Array.from(document.querySelectorAll('button.gamepad-button'))
        .find(b => b.classList.contains('Bgc($c-ds-background-gamepad-sparks-like-default)'));
      if (btn) {
        btn.click();
        chrome.storage.local.get({ totalLikes: 0 }, res =>
          chrome.storage.local.set({ totalLikes: res.totalLikes + 1 })
        );
      }
    }
  
    function startLiking(speed, duration) {
      clearInterval(intervalId);
      if (stopTimeout) clearTimeout(stopTimeout);
      intervalId = setInterval(clickLikeButton, speed);
      if (duration > 0) {
        stopTimeout = setTimeout(() => {
          clearInterval(intervalId);
          intervalId = null;
          chrome.storage.sync.set({ enabled: false, manualStart: false });
        }, duration * 1000);
      }
      console.log('[AutoLiker] Started');
    }
  
    function stopLiking() {
      clearInterval(intervalId);
      intervalId = null;
      if (stopTimeout) clearTimeout(stopTimeout);
      stopTimeout = null;
      console.log('[AutoLiker] Stopped');
    }
  
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync') return;
  
      if (changes.enabled) {
        if (changes.enabled.newValue) {
          chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
            startLiking(speed, duration)
          );
        } else {
          stopLiking();
        }
      }
  
      if (changes.speed && intervalId) {
        chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
          startLiking(speed, duration)
        );
      }
    });
  
    // Delay init after load to allow background.js to set reset state
    setTimeout(() => {
      chrome.storage.sync.get(
        { manualStart: false, speed: 200, duration: 0 },
        ({ manualStart, speed, duration }) => {
          if (manualStart) {
            console.log('[AutoLiker] Starting after delay');
            startLiking(speed, duration);
          } else {
            console.log('[AutoLiker] Manual start not set – skipping');
          }
        }
      );
    }, 300);
  })();
// content.js

(function () {
    if (window.__tinderAutoLikerInit) return;
    window.__tinderAutoLikerInit = true;
  
    let intervalId = null;
    let stopTimeout = null;
  
    function clickLikeButton() {
      const btn = Array.from(document.querySelectorAll('button.gamepad-button'))
        .find(b => b.classList.contains('Bgc($c-ds-background-gamepad-sparks-like-default)'));
      if (btn) {
        btn.click();
        chrome.storage.local.get({ totalLikes: 0 }, res =>
          chrome.storage.local.set({ totalLikes: res.totalLikes + 1 })
        );
      }
    }
  
    function startLiking(speed, duration) {
      clearInterval(intervalId);
      if (stopTimeout) clearTimeout(stopTimeout);
      intervalId = setInterval(clickLikeButton, speed);
      if (duration > 0) {
        stopTimeout = setTimeout(() => {
          clearInterval(intervalId);
          intervalId = null;
          chrome.storage.sync.set({ enabled: false, manualStart: false });
        }, duration * 1000);
      }
      console.log('[AutoLiker] Started');
    }
  
    function stopLiking() {
      clearInterval(intervalId);
      intervalId = null;
      if (stopTimeout) clearTimeout(stopTimeout);
      stopTimeout = null;
      console.log('[AutoLiker] Stopped');
    }
  
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync') return;
  
      if (changes.enabled) {
        if (changes.enabled.newValue) {
          chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
            startLiking(speed, duration)
          );
        } else {
          stopLiking();
        }
      }
  
      if (changes.speed && intervalId) {
        chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
          startLiking(speed, duration)
        );
      }
    });
  
    // Delay init after load to allow background.js to set reset state
    setTimeout(() => {
      chrome.storage.sync.get(
        { manualStart: false, speed: 200, duration: 0 },
        ({ manualStart, speed, duration }) => {
          if (manualStart) {
            console.log('[AutoLiker] Starting after delay');
            startLiking(speed, duration);
          } else {
            console.log('[AutoLiker] Manual start not set – skipping');
          }
        }
      );
    }, 300);
  })();
// content.js

(function () {
    if (window.__tinderAutoLikerInit) return;
    window.__tinderAutoLikerInit = true;
  
    let intervalId = null;
    let stopTimeout = null;
  
    function clickLikeButton() {
      const btn = Array.from(document.querySelectorAll('button.gamepad-button'))
        .find(b => b.classList.contains('Bgc($c-ds-background-gamepad-sparks-like-default)'));
      if (btn) {
        btn.click();
        chrome.storage.local.get({ totalLikes: 0 }, res =>
          chrome.storage.local.set({ totalLikes: res.totalLikes + 1 })
        );
      }
    }
  
    function startLiking(speed, duration) {
      clearInterval(intervalId);
      if (stopTimeout) clearTimeout(stopTimeout);
      intervalId = setInterval(clickLikeButton, speed);
      if (duration > 0) {
        stopTimeout = setTimeout(() => {
          clearInterval(intervalId);
          intervalId = null;
          chrome.storage.sync.set({ enabled: false, manualStart: false });
        }, duration * 1000);
      }
      console.log('[AutoLiker] Started');
    }
  
    function stopLiking() {
      clearInterval(intervalId);
      intervalId = null;
      if (stopTimeout) clearTimeout(stopTimeout);
      stopTimeout = null;
      console.log('[AutoLiker] Stopped');
    }
  
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area !== 'sync') return;
  
      if (changes.enabled) {
        if (changes.enabled.newValue) {
          chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
            startLiking(speed, duration)
          );
        } else {
          stopLiking();
        }
      }
  
      if (changes.speed && intervalId) {
        chrome.storage.sync.get(['speed', 'duration'], ({ speed, duration }) =>
          startLiking(speed, duration)
        );
      }
    });
  
    // Delay init after load to allow background.js to set reset state
    setTimeout(() => {
      chrome.storage.sync.get(
        { manualStart: false, speed: 200, duration: 0 },
        ({ manualStart, speed, duration }) => {
          if (manualStart) {
            console.log('[AutoLiker] Starting after delay');
            startLiking(speed, duration);
          } else {
            console.log('[AutoLiker] Manual start not set – skipping');
          }
        }
      );
    }, 300);
  })();
      