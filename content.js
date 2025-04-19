console.log("Tinder Auto Liker: content script loaded");
let intervalId = null;

function recordLike() {
    chrome.storage.local.get({ totalLikes: 0 }, (result) => {
        chrome.storage.local.set({ totalLikes: result.totalLikes + 1 });
    });
}

function clickLikeButton() {
    // Find the like button by specific class for like default background
    const likeBtn = Array.from(document.querySelectorAll('button.gamepad-button'))
        .find(btn => btn.classList.contains('Bgc($c-ds-background-gamepad-sparks-like-default)'));
    if (likeBtn) {
        likeBtn.click();
        recordLike();
    }
}

function startLiking() {
    chrome.storage.sync.get({ enabled: false, speed: 200, duration: 0 }, (items) => {
        if (!items.enabled) {
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
            return;
        }
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(clickLikeButton, items.speed);
        if (items.duration > 0) {
            setTimeout(() => {
                clearInterval(intervalId);
                intervalId = null;
            }, items.duration * 1000);
        }
    });
}

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && (changes.enabled || changes.speed || changes.duration)) {
        startLiking();
    }
});

startLiking();
