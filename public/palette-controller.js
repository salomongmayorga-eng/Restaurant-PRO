// Palette Manager for Restaurant Pro
(function() {
  const PALETTES = {
    emerald: {
      id: 'emerald',
      name: 'Verde Esmeralda',
      desc: 'Clásico & Fresco',
      emoji: '🌿',
      dot: '#25422f',
      accentDot: '#4a3728',
      vars: {
        '--color-pino-900': '#1b3022',
        '--color-pino-600': '#25422f',
        '--color-pino-500': '#2e523a',
        '--color-pino-300': '#8ca394',
        '--color-pino-100': '#e8edea',
        '--color-pino-50': '#f0f4f1',
        '--color-cafe-500': '#4a3728',
        '--color-cafe-800': '#2d2118',
        '--color-hueso': '#fdfbf7'
      }
    },
    wine: {
      id: 'wine',
      name: 'Borgoña Bistro',
      desc: 'Gourmet & Elegante',
      emoji: '🍷',
      dot: '#5b1022',
      accentDot: '#b45309',
      vars: {
        '--color-pino-900': '#2d0812',
        '--color-pino-600': '#5b1022',
        '--color-pino-500': '#7f1730',
        '--color-pino-300': '#fb7185',
        '--color-pino-100': '#ffe4e6',
        '--color-pino-50': '#fff1f2',
        '--color-cafe-500': '#b45309',
        '--color-cafe-800': '#78350f',
        '--color-hueso': '#fdfaf9'
      }
    },
    navy: {
      id: 'navy',
      name: 'Azul Marino',
      desc: 'Moderno & Ejecutivo',
      emoji: '🌊',
      dot: '#1e3a8a',
      accentDot: '#ea580c',
      vars: {
        '--color-pino-900': '#0f172a',
        '--color-pino-600': '#1e3a8a',
        '--color-pino-500': '#2563eb',
        '--color-pino-300': '#60a5fa',
        '--color-pino-100': '#dbeafe',
        '--color-pino-50': '#eff6ff',
        '--color-cafe-500': '#ea580c',
        '--color-cafe-800': '#9a3412',
        '--color-hueso': '#f8fafc'
      }
    }
  };

  const STORAGE_KEY = 'restaurant_pro_color_palette';

  // 1. Reset old cache keys for fresh restaurant state
  try {
    const resetKey = 'restaurant_pro_v3_clean_slate';
    if (!localStorage.getItem(resetKey)) {
      Object.keys(localStorage).forEach(key => {
        if (
          key.startsWith('taqueria') ||
          key.startsWith('rp_cache_') ||
          key.includes('menu_order') ||
          key.includes('User') ||
          key.includes('Branch')
        ) {
          localStorage.removeItem(key);
        }
      });
      localStorage.setItem(resetKey, 'true');
    }
  } catch (err) {
    console.warn('Cache clean error:', err);
  }

  function getActivePaletteId() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && PALETTES[saved]) return saved;
    } catch (e) {}
    return 'emerald';
  }

  function applyPalette(paletteId) {
    const palette = PALETTES[paletteId] || PALETTES.emerald;
    const root = document.documentElement;
    Object.entries(palette.vars).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
    try {
      localStorage.setItem(STORAGE_KEY, palette.id);
    } catch (e) {}

    // Update active UI classes
    document.querySelectorAll('.rp-palette-btn').forEach(btn => {
      const id = btn.getAttribute('data-palette');
      if (id === palette.id) {
        btn.classList.add('rp-active');
      } else {
        btn.classList.remove('rp-active');
      }
    });

    // Notify listeners
    window.dispatchEvent(new CustomEvent('restaurantPaletteChanged', { detail: palette }));
  }

  // Initial apply
  applyPalette(getActivePaletteId());

  // Inject CSS for the Palette Selector UI
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .rp-palette-bar {
      position: fixed;
      top: 10px;
      right: 12px;
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      padding: 5px 8px;
      border-radius: 9999px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08);
      border: 1px solid rgba(0, 0, 0, 0.08);
      font-family: system-ui, -apple-system, sans-serif;
    }
    .rp-palette-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      padding-left: 6px;
      padding-right: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .rp-palette-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      color: #475569;
      background: #f1f5f9;
      border: 1.5px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .rp-palette-btn:hover {
      background: #e2e8f0;
      transform: translateY(-1px);
    }
    .rp-palette-btn.rp-active {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .rp-palette-dot {
      width: 10px;
      height: 10px;
      border-radius: 9999px;
      display: inline-block;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.4);
    }
    @media (max-width: 640px) {
      .rp-palette-bar {
        top: 6px;
        right: 6px;
        padding: 4px 6px;
        gap: 4px;
      }
      .rp-palette-label {
        display: none;
      }
      .rp-palette-btn {
        padding: 4px 8px;
        font-size: 10px;
      }
    }
    .rp-login-helper {
      margin-top: 14px;
      padding: 10px 14px;
      background: #f8fafc;
      border: 1px dashed #cbd5e1;
      border-radius: 16px;
      text-align: center;
    }
    .rp-login-helper-title {
      font-size: 10px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 6px;
    }
    .rp-quick-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      margin: 2px 4px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 800;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      color: #1e293b;
      cursor: pointer;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      transition: all 0.15s ease;
    }
    .rp-quick-btn:hover {
      background: #f1f5f9;
      border-color: #94a3b8;
      transform: scale(1.02);
    }
  `;
  document.head.appendChild(styleEl);

  // Create Palette Selector Bar
  function renderPaletteBar() {
    const existing = document.getElementById('rp-palette-container');
    if (existing) existing.remove();

    const bar = document.createElement('div');
    bar.id = 'rp-palette-container';
    bar.className = 'rp-palette-bar';
    bar.innerHTML = `
      <div class="rp-palette-label">
        <span>🎨 Paleta:</span>
      </div>
      <button type="button" class="rp-palette-btn" data-palette="emerald" title="Verde Esmeralda - Clásico & Fresco">
        <span class="rp-palette-dot" style="background:#25422f"></span>
        <span>🌿 Esmeralda</span>
      </button>
      <button type="button" class="rp-palette-btn" data-palette="wine" title="Borgoña Bistro - Gourmet & Elegante">
        <span class="rp-palette-dot" style="background:#5b1022"></span>
        <span>🍷 Borgoña</span>
      </button>
      <button type="button" class="rp-palette-btn" data-palette="navy" title="Azul Marino - Moderno & Ejecutivo">
        <span class="rp-palette-dot" style="background:#1e3a8a"></span>
        <span>🌊 Azul Marino</span>
      </button>
    `;

    document.body.appendChild(bar);

    bar.querySelectorAll('.rp-palette-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const pId = btn.getAttribute('data-palette');
        applyPalette(pId);
      });
    });

    applyPalette(getActivePaletteId());
  }

  // Helper to attach quick fill on login form if present
  function checkAndEnhanceLoginForm() {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    if (document.getElementById('rp-login-helper')) return;

    // Check if username/password inputs exist
    const usernameInput = loginForm.querySelector('input[type="text"]');
    const passwordInput = loginForm.querySelector('input[type="password"]');
    if (!usernameInput || !passwordInput) return;

    const helperDiv = document.createElement('div');
    helperDiv.id = 'rp-login-helper';
    helperDiv.className = 'rp-login-helper';
    helperDiv.innerHTML = `
      <div class="rp-login-helper-title">Accesos Rápidos Restaurant Pro:</div>
      <button type="button" class="rp-quick-btn" id="rp-btn-admin">
        🔑 <b>admin</b> <span style="color:#64748b">(clave: 1234)</span>
      </button>
      <button type="button" class="rp-quick-btn" id="rp-btn-cocina">
        🍳 <b>cocina</b> <span style="color:#64748b">(clave: 1234)</span>
      </button>
    `;

    loginForm.appendChild(helperDiv);

    const btnAdmin = document.getElementById('rp-btn-admin');
    const btnCocina = document.getElementById('rp-btn-cocina');

    function triggerInput(el, val) {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (btnAdmin) {
      btnAdmin.addEventListener('click', () => {
        triggerInput(usernameInput, 'admin');
        triggerInput(passwordInput, '1234');
      });
    }

    if (btnCocina) {
      btnCocina.addEventListener('click', () => {
        triggerInput(usernameInput, 'cocina');
        triggerInput(passwordInput, '1234');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderPaletteBar();
      setTimeout(checkAndEnhanceLoginForm, 300);
    });
  } else {
    renderPaletteBar();
    setTimeout(checkAndEnhanceLoginForm, 300);
  }

  // Periodic check in case route or login screen re-renders
  setInterval(checkAndEnhanceLoginForm, 1000);

  // Expose global controller
  window.RestaurantProPalettes = {
    list: PALETTES,
    apply: applyPalette,
    getCurrent: () => PALETTES[getActivePaletteId()]
  };
})();
