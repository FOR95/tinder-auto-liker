document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-button');
    const speedInput = document.getElementById('speed-input');
    const durationInput = document.getElementById('duration-input');
    const presetSelect = document.getElementById('preset-select');
    const totalLikesDisplay = document.getElementById('total-likes');

    // Load settings
    chrome.storage.sync.get({ enabled: false, speed: 200, duration: 0 }, (items) => {
        speedInput.value = items.speed;
        durationInput.value = items.duration;
        updateToggle(items.enabled);
    });

    // Load total count
    chrome.storage.local.get({ totalLikes: 0 }, (result) => {
        totalLikesDisplay.textContent = result.totalLikes;
    });

    // Auto-save on input change
    speedInput.addEventListener('change', () => {
        chrome.storage.sync.set({ speed: parseInt(speedInput.value, 10) || 200 });
    });
    durationInput.addEventListener('change', () => {
        chrome.storage.sync.set({ duration: parseInt(durationInput.value, 10) || 0 });
    });
    presetSelect.addEventListener('change', () => {
        let speedVal;
        if (presetSelect.value === 'slow') speedVal = 1000;
        else if (presetSelect.value === 'medium') speedVal = 500;
        else if (presetSelect.value === 'fast') speedVal = 200;
        else return;
        speedInput.value = speedVal;
        chrome.storage.sync.set({ speed: speedVal });
    });

    // Toggle start/stop
    toggleButton.addEventListener('click', () => {
        chrome.storage.sync.get('enabled', (obj) => {
            const newState = !obj.enabled;
            chrome.storage.sync.set({ enabled: newState });
        });
    });

    function updateToggle(enabled) {
        toggleButton.textContent = enabled ? 'Stop' : 'Start';
        toggleButton.classList.toggle('stop', enabled);
    }

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.totalLikes) {
            totalLikesDisplay.textContent = changes.totalLikes.newValue;
        }
        if (area === 'sync') {
            if (changes.enabled) updateToggle(changes.enabled.newValue);
            if (changes.speed) speedInput.value = changes.speed.newValue;
            if (changes.duration) durationInput.value = changes.duration.newValue;
        }
    });
});
