const siteDomainInput = document.getElementById('siteDomain');
const cmsDomainInput = document.getElementById('cmsDomain');
const rootCategoryIdInput = document.getElementById('rootCategoryId');
const realtimeDomainInput = document.getElementById('realtimeDomain');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

chrome.storage.sync.get(['siteDomain', 'cmsDomain', 'rootCategoryId', 'realtimeDomain'], ({ siteDomain, cmsDomain, rootCategoryId, realtimeDomain }) => {
  if (siteDomain) siteDomainInput.value = siteDomain;
  if (cmsDomain) cmsDomainInput.value = cmsDomain;
  if (rootCategoryId) rootCategoryIdInput.value = rootCategoryId;
  if (realtimeDomain) realtimeDomainInput.value = realtimeDomain;
});

saveBtn.addEventListener('click', () => {
  const siteDomain = siteDomainInput.value.trim();
  const cmsDomain = cmsDomainInput.value.trim();
  const rootCategoryId = rootCategoryIdInput.value.trim();
  const realtimeDomain = realtimeDomainInput.value.trim();
  if (!siteDomain || !cmsDomain || !rootCategoryId) return;

  chrome.storage.sync.set({ siteDomain, cmsDomain, rootCategoryId, realtimeDomain }, () => {
    status.style.display = 'inline';
    setTimeout(() => { status.style.display = 'none'; }, 2000);
  });
});
