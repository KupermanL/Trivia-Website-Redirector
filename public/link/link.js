// Invite link fallback (Part 5A): shows the code from the path (/i/<8 digits>, /p/<6 digits>) when the app did not
// open the link. Nothing is sent anywhere: no requests, no cookies, no storage.
(function () {
  var body = document.body;
  var digits = Number(body.getAttribute('data-digits'));
  var seg = location.pathname.split('/').filter(Boolean)[1] || '';
  var code = new RegExp('^\\d{' + digits + '}$').test(seg) ? seg : null;

  if (!code) {
    body.classList.add('no-code');
  } else {
    var box = document.getElementById('code');
    box.setAttribute('aria-label', code.split('').join(' '));
    // Friend codes read as 4+4, party codes as 3+3.
    var half = digits / 2;
    for (var i = 0; i < code.length; i++) {
      if (i === half) {
        var gap = document.createElement('span');
        gap.className = 'gap';
        box.appendChild(gap);
      }
      var d = document.createElement('span');
      d.className = 'd';
      d.setAttribute('aria-hidden', 'true');
      d.textContent = code[i];
      d.style.setProperty('--i', String(i));
      box.appendChild(d);
    }
    var copy = document.getElementById('copy');
    copy.addEventListener('click', function () {
      if (!navigator.clipboard) return;
      navigator.clipboard.writeText(code).then(function () {
        copy.textContent = 'הקוד הועתק';
        copy.classList.add('done');
      });
    });
  }

  // The store of this phone comes first and stands out.
  var ua = navigator.userAgent || '';
  var apple = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  var android = /Android/.test(ua);
  var mine = apple ? 'store-apple' : android ? 'store-play' : null;
  if (mine) {
    var el = document.getElementById(mine);
    el.classList.add('mine');
    el.parentNode.insertBefore(el, el.parentNode.firstChild);
  }
})();
