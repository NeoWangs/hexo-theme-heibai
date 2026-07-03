(function () {
  var root = document.documentElement;
  var STORAGE_KEY = 'heibai-theme';

  function applyThemeText(dark) {
    var textEls = document.querySelectorAll('[data-theme-text]');
    for (var i = 0; i < textEls.length; i++) {
      textEls[i].textContent = dark ? '知白' : '守黑';
    }
  }

  function isDark() {
    return root.getAttribute('data-theme') === 'dark';
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyThemeText(isDark());

    var toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var dark = !isDark();
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        applyThemeText(dark);
        try { localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light'); } catch (e) {}
      });
    }

    var burger = document.querySelector('[data-nav-burger]');
    var drawer = document.querySelector('[data-nav-drawer]');
    if (burger && drawer) {
      burger.addEventListener('click', function () {
        drawer.classList.toggle('is-open');
      });
    }
  });
})();
