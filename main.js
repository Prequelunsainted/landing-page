(function () {
  'use strict';
  var d = document;
  var EMAIL = 'lucas2907.office@gmail.com';
  var USER = 'Prequelunsainted';
  var $ = function (id) { return d.getElementById(id); };

  /* ---------- menu ---------- */
  var nav = $('nav'), burger = $('burger');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- cabeçalho ---------- */
  var header = $('header'), ticking = false;
  function onScroll() { ticking = false; header.classList.toggle('scrolled', (window.scrollY || 0) > 12); }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- seção atual no menu ---------- */
  var linkMap = {};
  [].slice.call(nav.querySelectorAll('a[href^="#"]')).forEach(function (a) { linkMap[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('on'); });
        if (linkMap[en.target.id]) linkMap[en.target.id].classList.add('on');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(linkMap).forEach(function (id) { var s = $(id); if (s) navObs.observe(s); });
  }

  /* ---------- entradas discretas ao rolar ---------- */
  var rv = [].slice.call(d.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window) {
    var rvObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rvObs.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    rv.forEach(function (el) { rvObs.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- GitHub ao vivo: contagem e outros repositórios ---------- */
  var featured = ['titanium-finance', 'controle-financeiro1.2', 'gamera-secure-password-generator', 'afya-admin', USER.toLowerCase()];
  function cut(s, n) { return s.length > n ? s.slice(0, n - 1).trim() + '…' : s; }
  if (window.fetch) {
    fetch('https://api.github.com/users/' + USER).then(function (r) { return r.ok ? r.json() : null; }).then(function (u) {
      if (!u || typeof u.public_repos !== 'number') return;
      ['repos', 'repos-hero'].forEach(function (id) { var el = $(id); if (el) el.textContent = u.public_repos; });
    }).catch(function () {});
    fetch('https://api.github.com/users/' + USER + '/repos?per_page=100&sort=updated').then(function (r) { return r.ok ? r.json() : null; }).then(function (list) {
      if (!Array.isArray(list)) return;
      var others = list.filter(function (r) { return !r.fork && featured.indexOf(r.name.toLowerCase()) === -1; }).slice(0, 8);
      if (!others.length) return;
      var box = $('mais');
      box.textContent = '';
      others.forEach(function (r) {
        var a = d.createElement('a');
        a.className = 'card repo'; a.href = r.html_url; a.target = '_blank'; a.rel = 'noopener';
        var b = d.createElement('b'); b.textContent = r.name; a.appendChild(b);
        if (r.description) { var s = d.createElement('span'); s.textContent = cut(r.description, 90); a.appendChild(s); }
        if (r.language) { var l = d.createElement('span'); l.className = 'lang'; l.textContent = r.language; a.appendChild(l); }
        box.appendChild(a);
      });
    }).catch(function () {});
  }

  /* ---------- formulário de contato ---------- */
  var form = $('form'), status = $('status');
  var f = { nome: $('f-nome'), email: $('f-email'), assunto: $('f-assunto'), msg: $('f-msg') };
  var errs = { nome: $('e-nome'), email: $('e-email'), msg: $('e-msg') };
  function setErr(key, text) {
    errs[key].textContent = text;
    if (text) f[key].setAttribute('aria-invalid', 'true'); else f[key].removeAttribute('aria-invalid');
    return !text;
  }
  var checks = {
    nome: function () { return setErr('nome', f.nome.value.trim().length < 2 ? 'Informe seu nome.' : ''); },
    email: function () { return setErr('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.'); },
    msg: function () { return setErr('msg', f.msg.value.trim().length < 10 ? 'Escreva pelo menos 10 caracteres.' : ''); }
  };
  Object.keys(checks).forEach(function (k) {
    f[k].addEventListener('blur', checks[k]);
    f[k].addEventListener('input', function () { if (f[k].getAttribute('aria-invalid')) checks[k](); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = [checks.nome(), checks.email(), checks.msg()];
    if (ok.indexOf(false) !== -1) {
      status.textContent = 'Corrija os campos destacados e envie de novo.';
      var first = ['nome', 'email', 'msg'].filter(function (k) { return f[k].getAttribute('aria-invalid'); })[0];
      if (first) f[first].focus();
      return;
    }
    var subject = 'Contato pelo portfólio: ' + f.assunto.value;
    var body = 'Nome: ' + f.nome.value.trim() + '\nE-mail: ' + f.email.value.trim() + '\nAssunto: ' + f.assunto.value + '\n\n' + f.msg.value.trim();
    status.innerHTML = 'Pronto! Seu aplicativo de e-mail deve abrir com a mensagem preenchida. Se não abrir, escreva para <a href="mailto:' + EMAIL + '">' + EMAIL + '</a>.';
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });

  var year = $('ano');
  if (year) year.textContent = new Date().getFullYear();
})();
