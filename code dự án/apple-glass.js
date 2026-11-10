/* ==========================================================================
   APPLE LIQUID GLASS – hiệu ứng tương tác dùng chung
   1. Bong bóng kính trôi nổi ở nền
   2. Đèn rọi theo con trỏ trên thẻ kính (đặt biến --mx / --my)
   3. Hiện dần khi cuộn tới
   Không thay đổi dữ liệu hay luồng xử lý của trang.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CARD_SELECTOR = [
    '.hero-bento-card', '.feature-pill', '.showcase-info-panel', '.promo-left-card', '.promo-right-card',
    '.specialty-card', '.itinerary-box', '.timeline-step', '.damchat-home-ctrlbox', '.damchat-home-card',
    '.damchat-left-controls', '.damchat-active-card', '.toolbar-card', '.hotel-card', '.tip-card',
    '.convo-card', '.trip-card', '.eco-step-card', '.checkout-bill-card', '.tailored-box', '.cost-kpi-box',
    '.guide-card', '.checkin-box', '.impact-stat', '.dest-card', '.stat-item', '.food-card', '.calc-card',
    '.calc-result-box', '.stat-box', '.faq-item', '.card-box', '.wooden-sign-card', '.guidebook-mockup',
    '.hero-guarantees', '.host-ask-bubble', '.header-inner'
  ].join(',');

  var REVEAL_SELECTOR = [
    '.hero-bento-card', '.feature-pill', '.promo-left-card', '.promo-right-card', '.itinerary-box',
    '.timeline-step', '.toolbar-card', '.hotel-card', '.tip-card', '.trip-card', '.eco-step-card',
    '.guide-card', '.impact-stat', '.dest-card', '.stat-item', '.food-card', '.calc-card', '.stat-box',
    '.faq-item', '.card-box', '.section-header', '.home-card-slot'
  ].join(',');

  /* ---------- 1. Bong bóng nền ---------- */
  function spawnBubbles() {
    if (reduceMotion || document.querySelector('.ag-bubble-layer')) return;
    var layer = document.createElement('div');
    layer.className = 'ag-bubble-layer';
    layer.setAttribute('aria-hidden', 'true');
    var count = window.innerWidth < 760 ? 7 : 13;
    for (var i = 0; i < count; i++) {
      var b = document.createElement('span');
      b.className = 'ag-bubble';
      var size = 36 + Math.random() * 150;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = (Math.random() * 100).toFixed(2) + '%';
      b.style.animationDuration = (22 + Math.random() * 26).toFixed(1) + 's';
      b.style.animationDelay = (-Math.random() * 40).toFixed(1) + 's';
      b.style.setProperty('--drift', ((Math.random() - 0.5) * 160).toFixed(0) + 'px');
      b.style.opacity = '0';
      layer.appendChild(b);
    }
    document.body.insertBefore(layer, document.body.firstChild);
  }

  /* ---------- 2. Đèn rọi theo con trỏ ---------- */
  function bindSpotlight() {
    var raf = null, lastEvt = null;
    document.addEventListener('pointermove', function (e) {
      lastEvt = e;
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var t = lastEvt.target;
        var card = t && t.closest ? t.closest(CARD_SELECTOR) : null;
        if (!card) return;
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (lastEvt.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (lastEvt.clientY - r.top).toFixed(0) + 'px');
      });
    }, { passive: true });

    document.addEventListener('pointerout', function (e) {
      var card = e.target && e.target.closest ? e.target.closest(CARD_SELECTOR) : null;
      if (card && !card.contains(e.relatedTarget)) {
        card.style.removeProperty('--mx');
        card.style.removeProperty('--my');
      }
    }, { passive: true });
  }

  /* ---------- 3. Hiện dần khi cuộn ---------- */
  var io = null;
  function revealScan(root) {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var el = en.target;
            var delay = Number(el.getAttribute('data-ag-delay') || 0);
            setTimeout(function () { el.classList.add('ag-in'); }, delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }
    var list = (root || document).querySelectorAll(REVEAL_SELECTOR);
    var groupIdx = new Map();
    list.forEach(function (el) {
      if (el.classList.contains('ag-reveal') || el.closest('.modal-box, .modal-card, .backdrop, .modal-backdrop')) return;
      if (el.classList.contains('is-expanded')) return;
      var parent = el.parentElement;
      var n = groupIdx.get(parent) || 0;
      groupIdx.set(parent, n + 1);
      el.setAttribute('data-ag-delay', String(Math.min(n, 6) * 70));
      el.classList.add('ag-reveal');
      io.observe(el);
    });
  }

  function watchDynamicContent() {
    if (!('MutationObserver' in window)) return;
    var pending = false;
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      setTimeout(function () { pending = false; revealScan(document); }, 120);
    }).observe(document.body, { childList: true, subtree: true });
  }

  function init() {
    bindSpotlight();
    revealScan(document);
    watchDynamicContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
