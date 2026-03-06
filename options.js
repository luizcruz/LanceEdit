const siteDomainInput = document.getElementById('siteDomain');
const cmsDomainInput = document.getElementById('cmsDomain');
const rootCategoryIdInput = document.getElementById('rootCategoryId');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

chrome.storage.sync.get(['siteDomain', 'cmsDomain', 'rootCategoryId'], ({ siteDomain, cmsDomain, rootCategoryId }) => {
  if (siteDomain) siteDomainInput.value = siteDomain;
  if (cmsDomain) cmsDomainInput.value = cmsDomain;
  if (rootCategoryId) rootCategoryIdInput.value = rootCategoryId;
});

saveBtn.addEventListener('click', () => {
  const siteDomain = siteDomainInput.value.trim();
  const cmsDomain = cmsDomainInput.value.trim();
  const rootCategoryId = rootCategoryIdInput.value.trim();
  if (!siteDomain || !cmsDomain || !rootCategoryId) return;

  chrome.storage.sync.set({ siteDomain, cmsDomain, rootCategoryId }, () => {
    status.style.display = 'inline';
    setTimeout(() => { status.style.display = 'none'; }, 2000);
  });
});
