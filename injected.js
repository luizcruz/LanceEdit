(function () {
  var payload = null;
  try {
    if (window.customData && window.customData.page) {
      payload = { id: window.customData.page.id };
    }
  } catch (e) {}
  window.postMessage({ type: '__LANCE_EDIT_DATA__', payload: payload }, '*');
})();
