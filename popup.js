// popup.js

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-button');
  const speedInput = document.getElementById('speed-input');
  const durationInput = document.getElementById('duration-input');
  const presetSelect = document.getElementById('preset-select');
  const totalLikesDisplay = document.getElementById('total-likes');

  let currentState = false;

  // Lade Einstellungen + Preset
  chrome.storage.sync.get(
    { enabled: false, speed: 200, duration: 0, preset: "" },
    (data) => {
      speedInput.value = data.speed;
      durationInput.value = data.duration;
      presetSelect.value = data.preset || '';
      updateButton(data.enabled);
    }
  );

  // Lade Like-Zähler
  chrome.storage.local.get({ totalLikes: 0 }, (data) => {
    totalLikesDisplay.textContent = data.totalLikes;
  });

  // Start/Stop Button
  btn.addEventListener('click', () => {
    currentState = !currentState;
    chrome.storage.sync.set({ enabled: currentState, manualStart: currentState });
  });

  // Preset auswählen
  presetSelect.addEventListener('change', () => {
    let speed;
    if (presetSelect.value === 'slow') speed = 1000;
    if (presetSelect.value === 'medium') speed = 500;
    if (presetSelect.value === 'fast') speed = 200;

    if (speed) {
      speedInput.value = speed;
      chrome.storage.sync.set({ speed, preset: presetSelect.value });
    }
  });

  // Manuelle Änderung
  speedInput.addEventListener('change', () => {
    const speed = parseInt(speedInput.value, 10);
    chrome.storage.sync.set({ speed, preset: "" }); // Preset zurücksetzen
  });

  durationInput.addEventListener('change', () => {
    const duration = parseInt(durationInput.value, 10);
    chrome.storage.sync.set({ duration });
  });

  // Änderungen live beobachten
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
      if (changes.enabled) updateButton(changes.enabled.newValue);
      if (changes.preset) presetSelect.value = changes.preset.newValue;
    }
    if (area === 'local' && changes.totalLikes) {
      totalLikesDisplay.textContent = changes.totalLikes.newValue;
    }
  });

  function updateButton(enabled) {
    btn.textContent = enabled ? 'Stop' : 'Start';
    btn.classList.toggle('stop', enabled);
    currentState = enabled;
  }
});
