/**
 * Pixel Elephant Mini Companion - Chú Voi Mini Đắk Lắk
 * Pixel Art Virtual Pet tự do đi loanh quanh màn hình
 */
(function() {
  if (document.getElementById('pixel-elephant-companion')) return;

  // Tạo CSS Animation & Styling cho Chú Voi Pixel
  const style = document.createElement('style');
  style.id = 'pixel-elephant-style';
  style.textContent = `
    .pixel-elephant-pet {
      position: fixed;
      bottom: 14px;
      left: 60px;
      width: 56px;
      height: 46px;
      z-index: 999999;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      filter: drop-shadow(0 6px 12px rgba(0,0,0,0.35));
      transition: transform 0.15s ease-out;
      image-rendering: pixelated;
    }
    .pixel-elephant-pet:active {
      cursor: grabbing;
      transform: scale(1.15) !important;
    }
    .pixel-elephant-pet.facing-left .elephant-sprite {
      transform: scaleX(-1);
    }
    .elephant-sprite {
      width: 100%;
      height: 100%;
      display: block;
      transition: transform 0.2s ease;
    }

    /* Hiệu ứng nhún nhảy khi đi bộ */
    .pixel-elephant-pet.walking .elephant-body {
      animation: elephantBob 0.3s infinite alternate ease-in-out;
    }
    .pixel-elephant-pet.walking .leg-front-left {
      animation: legWalk1 0.3s infinite alternate ease-in-out;
    }
    .pixel-elephant-pet.walking .leg-back-right {
      animation: legWalk1 0.3s infinite alternate ease-in-out;
    }
    .pixel-elephant-pet.walking .leg-front-right {
      animation: legWalk2 0.3s infinite alternate ease-in-out;
    }
    .pixel-elephant-pet.walking .leg-back-left {
      animation: legWalk2 0.3s infinite alternate ease-in-out;
    }

    @keyframes elephantBob {
      0% { transform: translateY(0); }
      100% { transform: translateY(-3px); }
    }
    @keyframes legWalk1 {
      0% { transform: translateX(0); }
      100% { transform: translateX(4px); }
    }
    @keyframes legWalk2 {
      0% { transform: translateX(0); }
      100% { transform: translateX(-4px); }
    }

    /* Bong bóng lời thoại pixel */
    .elephant-speech-bubble {
      position: absolute;
      bottom: 56px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: #ffffff;
      color: #153d27;
      padding: 6px 11px;
      border-radius: 12px;
      font-size: 11.5px;
      font-weight: 800;
      font-family: 'Be Vietnam Pro', system-ui, sans-serif;
      white-space: nowrap;
      pointer-events: none;
      box-shadow: 0 4px 16px rgba(0,0,0,0.22);
      border: 2px solid #1e5638;
      opacity: 0;
      transition: opacity 0.25s ease, transform 0.25s ease;
      z-index: 1000000;
    }
    .elephant-speech-bubble::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: #1e5638 transparent transparent transparent;
    }
    .elephant-speech-bubble.active {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Hạt bong bóng tim bay lên khi click */
    .elephant-heart-particle {
      position: fixed;
      pointer-events: none;
      font-size: 16px;
      z-index: 1000001;
      animation: heartFly 1s forwards ease-out;
    }
    @keyframes heartFly {
      0% { opacity: 1; transform: translate(0, 0) scale(0.6); }
      50% { opacity: 1; transform: translate(var(--tx), -30px) scale(1.2); }
      100% { opacity: 0; transform: translate(var(--tx), -60px) scale(0.8); }
    }
  `;
  document.head.appendChild(style);

  // SVG Pixel Art của Voi Tây Nguyên (Thân xám, thảm lưng thổ cẩm đỏ vàng, ngà trắng, vòi dài)
  const elephantSvg = `
    <svg class="elephant-sprite" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g class="elephant-body">
        <!-- Đuôi voi -->
        <rect x="1" y="9" width="1" height="4" fill="#334155" />
        <rect x="0" y="12" width="2" height="2" fill="#1e293b" />

        <!-- Mông & Thân Voi -->
        <rect x="2" y="5" width="15" height="11" fill="#64748b" />
        <rect x="3" y="4" width="13" height="1" fill="#94a3b8" />
        <rect x="2" y="6" width="1" height="9" fill="#475569" />
        
        <!-- Yếm / Tấm thổ cẩm đỏ vàng trên lưng đặc trưng Tây Nguyên -->
        <rect x="5" y="4" width="8" height="5" fill="#dc2626" />
        <rect x="6" y="5" width="6" height="3" fill="#f59e0b" />
        <rect x="7" y="6" width="4" height="1" fill="#ffffff" />
        <rect x="5" y="9" width="8" height="1" fill="#fde047" />

        <!-- Đầu Voi -->
        <rect x="15" y="3" width="8" height="9" fill="#64748b" />
        <rect x="16" y="2" width="6" height="1" fill="#94a3b8" />

        <!-- Mắt pixel voi -->
        <rect x="19" y="5" width="2" height="2" fill="#0f172a" />
        <rect x="19" y="5" width="1" height="1" fill="#ffffff" />

        <!-- Tai to voi Tây Nguyên -->
        <rect x="13" y="4" width="3" height="7" fill="#475569" />
        <rect x="14" y="5" width="2" height="5" fill="#f43f5e" opacity="0.75" />

        <!-- Ngà Voi trắng -->
        <rect x="21" y="10" width="3" height="2" fill="#fef08a" />
        <rect x="23" y="9" width="2" height="2" fill="#ffffff" />

        <!-- Vòi Voi uốn cong vẫy lên phía trước -->
        <rect x="22" y="6" width="3" height="5" fill="#64748b" />
        <rect x="24" y="8" width="2" height="4" fill="#64748b" />
        <rect x="25" y="5" width="2" height="4" fill="#64748b" />
        <rect x="26" y="4" width="2" height="2" fill="#475569" />
      </g>

      <!-- 4 Chân Voi Pixel -->
      <g class="leg-back-left">
        <rect x="4" y="16" width="3" height="5" fill="#475569" />
        <rect x="4" y="20" width="3" height="2" fill="#1e293b" />
      </g>
      <g class="leg-front-left">
        <rect x="8" y="16" width="3" height="6" fill="#64748b" />
        <rect x="8" y="21" width="3" height="2" fill="#334155" />
      </g>
      <g class="leg-back-right">
        <rect x="12" y="16" width="3" height="5" fill="#475569" />
        <rect x="12" y="20" width="3" height="2" fill="#1e293b" />
      </g>
      <g class="leg-front-right">
        <rect x="16" y="16" width="3" height="6" fill="#64748b" />
        <rect x="16" y="21" width="3" height="2" fill="#334155" />
      </g>
    </svg>
  `;

  // Tạo phần tử DOM Chú voi
  const pet = document.createElement('div');
  pet.id = 'pixel-elephant-companion';
  pet.className = 'pixel-elephant-pet walking';
  pet.setAttribute('title', 'Chú voi pixel Tây Nguyên • Bấm vào tớ nhé!');
  pet.innerHTML = `
    ${elephantSvg}
    <div class="elephant-speech-bubble" id="elephantSpeech">Chào bạn! 🐘</div>
  `;
  document.body.appendChild(pet);

  const bubble = document.getElementById('elephantSpeech');

  // Trạng thái vận hành
  let posX = Math.random() * (window.innerWidth - 120) + 40;
  let posY = 14; // cách bottom
  let speedX = 1.35; // tốc độ đi pixel/frame
  let direction = 1; // 1: đi sang phải, -1: đi sang trái
  let isWalking = true;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let petStartX = 0;
  let petBottom = 14;

  const MESSAGES = [
    "Chào bạn đến Đắk Lắk! 🌿",
    "Khám phá Buôn Đôn thôi! 🐘",
    "Cà phê Ban Mê thơm quá! ☕",
    "Thác Dray Nur hùng vĩ lắm! 🌊",
    "Bạn kéo tớ đi chơi với! ♥",
    "Tút tút! Chúc bạn ngày vui! ✨",
    "Lên Hồ Lắk cưỡi gió nào! 🌅"
  ];

  function showMessage(text) {
    bubble.textContent = text;
    bubble.classList.add('active');
    setTimeout(() => {
      bubble.classList.remove('active');
    }, 3200);
  }

  // Âm thanh kèn voi mini bằng Web Audio Synth (vui nhộn, không cần mạng)
  function playElephantTrumpet() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      // Hiệu ứng tiếng kèn voi vút lên
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.28);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.42);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.48);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) {}
  }

  // Bắn tim bay lên
  function spawnHearts(x, y) {
    const emojis = ['💖', '✨', '🐘', '💧', '🌿'];
    for (let i = 0; i < 4; i++) {
      const p = document.createElement('div');
      p.className = 'elephant-heart-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = (x + (Math.random() * 30 - 15)) + 'px';
      p.style.bottom = (y + 30) + 'px';
      p.style.setProperty('--tx', (Math.random() * 50 - 25) + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

  // Vòng lặp cử động đi loanh quanh
  function wanderLoop() {
    if (!isDragging) {
      if (isWalking) {
        posX += speedX * direction;

        // Kiểm tra chạm biên màn hình
        const maxW = window.innerWidth - 65;
        if (posX >= maxW) {
          posX = maxW;
          direction = -1;
          pet.classList.add('facing-left');
          // Có xác suất dừng lại nghỉ
          maybeRest();
        } else if (posX <= 10) {
          posX = 10;
          direction = 1;
          pet.classList.remove('facing-left');
          maybeRest();
        }

        pet.style.left = posX + 'px';
        pet.style.bottom = petBottom + 'px';
      }
    }
    requestAnimationFrame(wanderLoop);
  }

  function maybeRest() {
    if (Math.random() < 0.4) {
      isWalking = false;
      pet.classList.remove('walking');

      // Đôi lúc nói chuyện khi nghỉ
      if (Math.random() < 0.6) {
        showMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      }

      // Nghỉ 2 đến 4 giây rồi đi tiếp
      const restTime = 2000 + Math.random() * 2500;
      setTimeout(() => {
        if (!isDragging) {
          isWalking = true;
          pet.classList.add('walking');
        }
      }, restTime);
    }
  }

  // Tương tác Click vào chú voi
  pet.addEventListener('click', function(e) {
    if (isDragging) return;
    playElephantTrumpet();
    const rect = pet.getBoundingClientRect();
    spawnHearts(rect.left + rect.width / 2, window.innerHeight - rect.bottom);
    showMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);

    // Hiệu ứng nhảy cẫng lên
    pet.style.transform = 'translateY(-18px) scale(1.15)';
    setTimeout(() => {
      pet.style.transform = '';
    }, 250);
  });

  // Hỗ trợ Kéo Thả (Drag & Drop)
  pet.addEventListener('mousedown', startDrag);
  pet.addEventListener('touchstart', startDrag, { passive: false });

  function startDrag(e) {
    isDragging = true;
    isWalking = false;
    pet.classList.remove('walking');

    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

    dragStartX = clientX;
    dragStartY = clientY;
    petStartX = posX;
    const currentBottom = parseInt(pet.style.bottom || '14', 10);

    function onMove(ev) {
      const curX = ev.type.includes('touch') ? ev.touches[0].clientX : ev.clientX;
      const curY = ev.type.includes('touch') ? ev.touches[0].clientY : ev.clientY;
      const dx = curX - dragStartX;
      const dy = dragStartY - curY; // kéo lên là dy dương

      posX = Math.max(10, Math.min(window.innerWidth - 65, petStartX + dx));
      petBottom = Math.max(10, Math.min(window.innerHeight - 80, currentBottom + dy));

      pet.style.left = posX + 'px';
      pet.style.bottom = petBottom + 'px';
    }

    function onEnd() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);

      // Thả rơi từ từ xuống đáy với hiệu ứng nảy
      const fallInterval = setInterval(() => {
        if (petBottom > 14) {
          petBottom -= 8;
          if (petBottom <= 14) {
            petBottom = 14;
            clearInterval(fallInterval);
            isDragging = false;
            isWalking = true;
            pet.classList.add('walking');
          }
          pet.style.bottom = petBottom + 'px';
        } else {
          clearInterval(fallInterval);
          isDragging = false;
          isWalking = true;
          pet.classList.add('walking');
        }
      }, 16);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }

  // Khởi động
  requestAnimationFrame(wanderLoop);

  // Lời chào mở đầu sau 1.5 giây
  setTimeout(() => {
    showMessage("Tút tút! Tớ là Voi Mini Đắk Lắk ♥");
  }, 1500);

})();