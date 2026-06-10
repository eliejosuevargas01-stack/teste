document.addEventListener('DOMContentLoaded', () => {
  setupTheme();
  setupInteractions();
});

/**
 * Handles Dark / Light / Auto (System) theme switching.
 */
function setupTheme() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const storageKey = 'noble-curie-theme';
  
  // Read saved theme or default to auto
  const savedTheme = localStorage.getItem(storageKey) || 'auto';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme');
      localStorage.setItem(storageKey, selectedTheme);
      applyTheme(selectedTheme);
    });
  });

  function applyTheme(theme) {
    // Update active class on buttons
    themeButtons.forEach(btn => {
      if (btn.getAttribute('data-theme') === theme) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Toggle color-scheme style properties
    if (theme === 'auto') {
      document.documentElement.style.colorScheme = '';
    } else {
      document.documentElement.style.colorScheme = theme;
    }
  }
}

/**
 * Handles micro-interactions on the page elements.
 */
function setupInteractions() {
  // Primary Connect button interaction
  const btnConnect = document.getElementById('btn-action-primary');
  if (btnConnect) {
    btnConnect.addEventListener('click', () => {
      const span = btnConnect.querySelector('span');
      const svg = btnConnect.querySelector('svg');
      
      if (btnConnect.classList.contains('connected')) {
        // Toggle back to connect
        btnConnect.classList.remove('connected');
        btnConnect.style.background = '';
        span.textContent = 'Conectar';
        if (svg) svg.style.display = 'block';
      } else {
        // Show loading state first
        span.textContent = 'Conectando...';
        btnConnect.disabled = true;
        
        setTimeout(() => {
          btnConnect.disabled = false;
          btnConnect.classList.add('connected');
          // Update visual feedback using oklch success tone
          btnConnect.style.background = 'oklch(0.75 0.18 140)'; // Success green
          btnConnect.style.boxShadow = '0 4px 12px rgba(0, 200, 100, 0.2)';
          span.textContent = 'Conectado!';
          if (svg) svg.style.display = 'none';
        }, 800);
      }
    });
  }

  // Secondary button interaction (alert for demo)
  const btnPortfolio = document.getElementById('btn-action-secondary');
  if (btnPortfolio) {
    btnPortfolio.addEventListener('click', () => {
      // Simulate navigating to portfolio
      const message = document.createElement('div');
      message.className = 'portfolio-notification';
      message.textContent = 'Redirecionando para o portfólio... (Simulado)';
      message.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: var(--color-accent-bg);
        color: var(--color-accent);
        border: 1px solid var(--color-accent);
        padding: 0.75rem 1.5rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        box-shadow: var(--shadow-main);
        z-index: 1000;
        transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
      `;
      document.body.appendChild(message);
      
      // Force layout transition reflow
      requestAnimationFrame(() => {
        message.style.transform = 'translateX(-50%) translateY(0)';
      });

      // Remove after duration
      setTimeout(() => {
        message.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
          message.remove();
        }, 400);
      }, 2500);
    });
  }

  // Skill tags tag click micro-interaction
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      // Toggle custom active state color mixing
      tag.style.transform = 'scale(1.15)';
      setTimeout(() => {
        tag.style.transform = '';
      }, 150);
    });
  });
}
