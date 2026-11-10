/* ==========================================================================
   SHARED.JS – Chạm Đắk Lắk
   JavaScript dùng chung: toast, cart, scroll header, nav active,
   rating modal (chấm điểm), confetti.
   ========================================================================== */

// ── TOAST ──────────────────────────────────────────────────────────────────
const toastBox = document.getElementById('toastBox');
let _toastTimer = null;
function showToast(msg) {
  if (!toastBox) return;
  toastBox.textContent = msg;
  toastBox.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toastBox.classList.remove('show'), 2800);
}

// ── CART (shared state via localStorage) ────────────────────────────────────
function getCart() {
  try { return JSON.parse(localStorage.getItem('cdl_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('cdl_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) { existing.qty = (existing.qty || 1) + 1; }
  else { cart.push({ name, price: price || 0, qty: 1 }); }
  saveCart(cart);
  showToast(` Đã thêm "${name}" vào giỏ hàng!`);
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  document.querySelectorAll('#cartCount').forEach(el => { el.textContent = total || ''; });
}

// Legacy helper used by some pages (onclick="addCart(...)")
function addCart(name, price) { addToCart(name, price); }

// ── SCROLL HEADER & MOBILE MENU ──────────────────────────────────────────────
const _header = document.getElementById('topHeader');
if (_header) {
  window.addEventListener('scroll', () => {
    _header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}

const _mobileBtn = document.getElementById('mobileMenuBtn');
const _mainNav = document.querySelector('.main-nav');
if (_mobileBtn && _mainNav) {
  _mobileBtn.addEventListener('click', () => {
    _mainNav.classList.toggle('open');
  });
}

// ── SEARCH (nav & hero) ──────────────────────────────────────────────────────
function runSearch(q) {
  if (!q) return;
  const lq = q.toLowerCase();
  const pages = [
    { k: ['đặt phòng', 'homestay', 'khách sạn', 'nhà nghỉ', 'glamping', 'resort', 'phòng', 'traveloka', 'lee', 'lưu trú'], url: 'dat-phong.html' },
    { k: ['thác', 'dray', 'hồ lắk', 'địa điểm', 'buôn đôn'], url: 'dia-diem.html' },
    { k: ['cà phê', 'mật ong', 'mắc ca', 'ca cao', 'đặc sản'], url: 'dac-san.html' },
    { k: ['hướng dẫn viên', 'guide', 'sinh viên'], url: 'huong-dan-vien.html' },
    { k: ['tin tức', 'foodtour', 'bmt', 'ăn sập', 'chi phí'], url: 'tin-tuc.html' },
    { k: ['lịch trình', 'tour', 'tư vấn'], url: 'Dat_lich_trinh.html' },
    { k: ['về chúng tôi', 'about', 'liên hệ'], url: 've-chung-toi.html' },
  ];
  for (const p of pages) {
    if (p.k.some(k => lq.includes(k))) { window.location.href = p.url; return; }
  }
  showToast(` Tìm kiếm: "${q}" – Đang cập nhật...`);
}

const heroSearchForm = document.getElementById('heroSearchForm');
const heroSearchInput = document.getElementById('heroSearchInput');
if (heroSearchForm) {
  heroSearchForm.addEventListener('submit', e => { e.preventDefault(); runSearch(heroSearchInput.value.trim()); });
  document.querySelectorAll('.suggestion-tag').forEach(tag => {
    tag.addEventListener('mousedown', e => {
      e.preventDefault();
      const q = tag.dataset.query;
      if (heroSearchInput) heroSearchInput.value = q;
      runSearch(q);
    });
  });
}
const navSearchInput = document.getElementById('navSearchInput');
if (navSearchInput) {
  navSearchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); runSearch(navSearchInput.value.trim()); }
  });
}

// ── RATING MODAL (shared – works with both dest cards & specialty cards) ────
(function initRatingModal() {
  const backdrop = document.getElementById('ratingLevelModal');
  if (!backdrop) return;

  const closeBtn    = document.getElementById('closeRatingModal');
  const itemTitle   = document.getElementById('rateItemTitle');
  const previewBadge = document.getElementById('previewLevelBadge');
  const previewText  = document.getElementById('previewLevelText');
  const previewScore = document.getElementById('previewScoreNum');
  const previewStars = document.getElementById('previewScoreStars');
  const starBtns     = document.querySelectorAll('.star-btn');
  const sliders      = document.querySelectorAll('.criteria-slider');
  const submitBtn    = document.getElementById('submitRatingBtn');

  let currentItem = null;
  let currentStars = 0;
  let soundOn = true;

  function openModal(item) {
    currentItem = item;
    currentStars = 0;
    if (itemTitle) itemTitle.textContent = item.title || 'Sản phẩm / Địa điểm';
    starBtns.forEach(b => b.classList.remove('active'));
    sliders.forEach(s => { s.value = item.c1 || 80; });
    updatePreview(parseFloat(item.rating) || 4.5);
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    currentStars = 0;
    starBtns.forEach(b => b.classList.remove('active', 'hovered'));
  }
  function updatePreview(score) {
    if (!previewScore) return;
    previewScore.textContent = score.toFixed(1);
    previewStars.textContent = ''.repeat(Math.round(score)) + ''.repeat(5 - Math.round(score));
    const lvl = score >= 4.8 ? 5 : score >= 4.3 ? 4 : 3;
    const lvlText = lvl === 5 ? 'OCOP Level 5  (Thượng hạng)' : lvl === 4 ? 'OCOP Level 4  (Xuất sắc)' : 'OCOP Level 3  (Tốt)';
    if (previewBadge) { previewBadge.className = `level-badge level-${lvl}`; }
    if (previewText) previewText.textContent = lvlText;
  }

  // Star hover/click
  starBtns.forEach((btn, i) => {
    btn.addEventListener('mouseenter', () => {
      starBtns.forEach((b, j) => b.classList.toggle('hovered', j <= i));
    });
    btn.addEventListener('mouseleave', () => {
      starBtns.forEach(b => b.classList.remove('hovered'));
    });
    btn.addEventListener('click', () => {
      currentStars = i + 1;
      starBtns.forEach((b, j) => b.classList.toggle('active', j < currentStars));
      updatePreview(currentStars);
      if (soundOn) { try { const a = new AudioContext(); const o = a.createOscillator(); const g = a.createGain(); o.connect(g); g.connect(a.destination); o.frequency.value = 300 + currentStars * 80; g.gain.setValueAtTime(0.15, a.currentTime); g.gain.exponentialRampToValueAtTime(0.001, a.currentTime + 0.3); o.start(); o.stop(a.currentTime + 0.3); } catch {} }
    });
  });

  sliders.forEach(s => {
    s.addEventListener('input', () => {
      if (currentStars === 0) return;
      const avg = Array.from(sliders).reduce((sum, sl) => sum + Number(sl.value), 0) / sliders.length;
      const blended = (currentStars * 0.6 + avg / 100 * 5 * 0.4);
      updatePreview(Math.min(5, Math.max(1, blended)));
    });
  });

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      if (!currentStars) { showToast(' Hãy chọn số sao trước nhé!'); return; }
      launchConfetti();
      showToast(` Cảm ơn bạn đã chấm điểm "${currentItem?.title}"!`);
      setTimeout(closeModal, 1800);
    });
  }

  // Open from any .btn-rate-trigger
  document.querySelectorAll('.btn-rate-trigger').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const d = btn.dataset;
      openModal({ title: d.title || d.rateTitle || 'Sản phẩm', rating: d.rating || '4.5', c1: d.c1 || 80 });
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });

  // Sound toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) soundBtn.addEventListener('click', () => {
    soundOn = !soundOn;
    soundBtn.textContent = soundOn ? ' Âm thanh' : ' Tắt';
  });
})();

// ── CONFETTI ─────────────────────────────────────────────────────────────────
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    vx: (Math.random() - 0.5) * 4,
    vy: Math.random() * 3 + 2,
    color: ['#f59e0b','#10b981','#3b82f6','#ec4899','#153d27'][Math.floor(Math.random() * 5)],
    size: Math.random() * 8 + 4,
    rotation: Math.random() * 360,
    rotV: (Math.random() - 0.5) * 6,
  }));
  let frame;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.rotation += p.rotV;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });
    if (particles.some(p => p.y < canvas.height)) frame = requestAnimationFrame(animate);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  animate();
  setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 3000);
}

// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  // Cart buttons
  document.querySelectorAll('[data-product]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.product, Number(btn.dataset.price) || 0));
  });
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.product || btn.textContent.trim();
      addToCart(name);
    });
  });
  document.querySelectorAll('.btn-buy').forEach(btn => {
    // handled by inline onclick in some pages, skip if already bound
  });
  // Cart icon click
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', () => showToast(` Giỏ hàng: ${getCart().length} sản phẩm`));
  // User icon click
  const userBtn = document.getElementById('userBtn');
  if (userBtn) userBtn.addEventListener('click', () => showToast(' Tính năng tài khoản đang phát triển...'));
});
