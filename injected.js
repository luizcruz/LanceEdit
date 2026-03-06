(function () {
  var payload = null;
  try {
    var path = window.location.pathname;
    var isTemporeal = path.indexOf('/temporeal/partida/') !== -1 ||
                      path.indexOf('/temporeal/evento/') !== -1;
    if (isTemporeal) {
      var matchId = null;
      if (window.match_id) {
        matchId = String(window.match_id);
      } else {
        var m = document.documentElement.innerHTML.match(/"match_id"\s*:\s*(\d+)/);
        if (m) matchId = m[1];
      }
      payload = { matchId: matchId };
    } else {
      if (window.customData && window.customData.page) {
        payload = { id: window.customData.page.id };
      }
    }
  } catch (e) {}
  window.postMessage({ type: '__LANCE_EDIT_DATA__', payload: payload }, '*');
})();
