// Sends visitors from / to their preferred language. Without JavaScript the page lists the three languages.
(function () {
  var supported = ['fr', 'en', 'ar'];
  var prefs = navigator.languages || [navigator.language || 'fr'];
  for (var i = 0; i < prefs.length; i++) {
    var code = String(prefs[i]).slice(0, 2).toLowerCase();
    if (supported.indexOf(code) !== -1) {
      location.replace('/' + code + '/');
      return;
    }
  }
  location.replace('/fr/');
})();
