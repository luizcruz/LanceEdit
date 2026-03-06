const siteDomainInput = document.getElementById('siteDomain');
const cmsDomainInput = document.getElementById('cmsDomain');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

chrome.storage.sync.get(['siteDomain', 'cmsDomain'], ({ siteDomain, cmsDomain }) => {
  if (siteDomain) siteDomainInput.value = siteDomain;
  if (cmsDomain) cmsDomainInput.value = cmsDomain;
});

saveBtn.addEventListener('click', () => {
  const siteDomain = siteDomainInput.value.trim();
  const cmsDomain = cmsDomainInput.value.trim();
  if (!siteDomain || !cmsDomain) return;

  chrome.storage.sync.set({ siteDomain, cmsDomain }, () => {
    status.style.display = 'inline';
    setTimeout(() => { status.style.display = 'none'; }, 2000);
  });
});
