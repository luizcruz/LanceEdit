(async () => {
  const { siteDomain, cmsDomain, rootCategoryId } = await chrome.storage.sync.get(['siteDomain', 'cmsDomain', 'rootCategoryId']);

  if (!siteDomain || !cmsDomain || !rootCategoryId) return;

  function matchesDomain(hostname, configured) {
    const strip = (h) => h.replace(/^www\./, '');
    return hostname === configured || strip(hostname) === strip(configured);
  }

  if (!matchesDomain(window.location.hostname, siteDomain)) return;

  // Ask the background service worker to execute injected.js in the MAIN world.
  // Direct <script> injection is blocked by the page's CSP; chrome.scripting bypasses it.
  chrome.runtime.sendMessage({ type: 'INJECT_MAIN_WORLD' });

  // Receive data from injected script
  window.addEventListener('message', function handler(event) {
    if (event.source !== window) return;
    if (!event.data || event.data.type !== '__LANCE_EDIT_DATA__') return;
    window.removeEventListener('message', handler);

    const pathname = window.location.pathname;
    const isRoot = pathname === '/' || pathname === '';
    const pageId = event.data.payload && event.data.payload.id;

    if (!isRoot && !pageId) return;

    const rootUrl =
      `https://${cmsDomain}/wp-admin/term.php?taxonomy=category&tag_ID=${rootCategoryId}&post_type=post&wp_http_referer=%2Fwp-admin%2Fedit-tags.php%3Ftaxonomy%3Dcategory`;
    const editUrl =
      `https://${cmsDomain}/wp-admin/post.php?post=${pageId}&action=edit`;

    const btn = document.createElement('button');
    btn.title = isRoot ? 'Manage categories' : 'Edit in CMS';
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none"
           stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    `;

    Object.assign(btn.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: '2147483647',
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      background: '#e8192c',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
      transition: 'transform 0.15s ease',
      padding: '0',
    });

    btn.addEventListener('mouseenter', () => { btn.style.transform = 'scale(1.12)'; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'scale(1)'; });

    btn.addEventListener('click', () => {
      window.open(isRoot ? rootUrl : editUrl, '_blank');
    });

    document.body.appendChild(btn);
  });
})();
