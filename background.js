chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    siteDomain: 'www.lance.com.br',
    cmsDomain: 'cms.lancecorp.com.br',
  });
});
