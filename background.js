chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    siteDomain: '',
    cmsDomain: '',
    rootCategoryId: '',
    realtimeDomain: '',
  });
});

// Execute injected.js in the page's MAIN world to bypass CSP restrictions.
// Content scripts cannot do this directly; only the service worker can.
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'INJECT_MAIN_WORLD' && sender.tab) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      world: 'MAIN',
      files: ['injected.js'],
    });
  }
});
