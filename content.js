// content.js

(function () {
  if (window.__tinderAutoLikerInit) return;
  window.__tinderAutoLikerInit = true;

  let intervalId = null;
  let stopTimeout = null;
  let lastCardHTML = "";

  function clickLikeButton() {
    const btn = Array.from(document.querySelectorAll('button.gamepad-button'))
      .find(b => {
        const span = b.querySelector('span.Hidden');
        return span && span.textContent.trim() === "Gefällt mir";
      });

    if (btn && !btn.disabled && btn.offsetParent !== null) {
      try {
        lastCardHTML = getCardSignature(); // speichern vor Klick
        btn.click();
        console.log('[AutoLiker] Like-Klick ausgeführt');
      } catch (err) {
        console.warn('[AutoLiker] Klick fehlgeschlagen', err);
      }
    } else {
      console.log('[AutoLiker] Kein Like-Button sichtbar');
    }
  }

  function getCardSignature() {
    const card = document.querySelector('div.recsCardboard__cards'); // Kartencontainer
    return card ? card.innerHTML.slice(0, 500) : '';
  }

  function startLiking(speed, duration) {
    stopLiking();

    intervalId = setInterval(clickLikeButton, speed);

    if (duration > 0) {
      stopTimeout = setTimeout(() => {
        stopLiking();
        chrome.storage.sync.set({ enabled: false, manualStart: false });
        console.log('[AutoLiker] Zeitlimit erreicht – gestoppt');
      }, duration * 1000);
    }

    console.log(`[AutoLiker] Start mit Intervall ${speed}ms`);
  }

  function stopLiking() {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    if (stopTimeout) clearTimeout(stopTimeout);
    stopTimeout = null;
    console.log('[AutoLiker] Gestoppt');
  }

  // MutationObserver auf Kartenbereich
  const observer = new MutationObserver(() => {
    const current = getCardSignature();
    if (current && current !== lastCardHTML) {
      lastCardHTML = current;
      chrome.storage.local.get({ totalLikes: 0 }, res =>
        chrome.storage.local.set({ totalLikes: res.totalLikes + 1 })
      );
      console.log('[AutoLiker] Profilwechsel erkannt ✅ Zähler +1');
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Auf Storage reagieren (Start/Stop)
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

  // Initial Startprüfung (manueller Trigger)
  setTimeout(() => {
    chrome.storage.sync.get(
      { manualStart: false, speed: 200, duration: 0 },
      ({ manualStart, speed, duration }) => {
        if (manualStart) {
          console.log('[AutoLiker] Manueller Start erkannt');
          startLiking(speed, duration);
        }
      }
    );
  }, 300);
})();
