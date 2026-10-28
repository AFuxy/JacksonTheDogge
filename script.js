/**
 * JacksonTheDogge - Handcrafted Artist Portfolio
 * Pure Vanilla JavaScript: Fast, lightweight, fully mobile-responsive
 */

document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initCommissionsToggle();
  initGalleryFilter();
  initKeyboardNav();
});

/* ==========================================================================
   1. Reliable Mobile & Desktop Page Router
   ========================================================================== */

const validPages = ['home', 'commissions', 'tos', 'gallery'];

function getHashPage() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  return validPages.includes(hash) ? hash : 'home';
}

function goToPage(targetPage, updateHash = true) {
  const page = validPages.includes(targetPage) ? targetPage : 'home';

  // Update active page sections
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(`page-${page}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Update washi navigation tabs
  document.querySelectorAll('.tab-link').forEach(tab => {
    if (tab.getAttribute('data-nav') === page) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Update window hash if requested
  if (updateHash && window.location.hash !== `#${page}`) {
    if (history.pushState) {
      history.pushState(null, '', `#${page}`);
    } else {
      window.location.hash = page;
    }
  }

  // Smooth scroll to top of sketchbook on page change
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initRouter() {
  // Bind all nav links (tabs, chunky buttons, quick chips, inline links)
  document.querySelectorAll('[data-nav]').forEach(el => {
    // Click event for desktop and standard mobile
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('data-nav');
      goToPage(target, true);
    });
  });

  // Handle browser back/forward and hash changes
  window.addEventListener('hashchange', () => {
    goToPage(getHashPage(), false);
  });

  window.addEventListener('popstate', () => {
    goToPage(getHashPage(), false);
  });

  // Initialize page on load
  goToPage(getHashPage(), false);
}

/* ==========================================================================
   2. Commissions 2D / 3D Pricing Toggle
   ========================================================================== */

function initCommissionsToggle() {
  const toggleBtns = document.querySelectorAll('[data-comm-tab]');
  const pricing2d = document.getElementById('pricing-2d');
  const pricing3d = document.getElementById('pricing-3d');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-comm-tab');
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (tab === '2d') {
        pricing2d.style.display = 'grid';
        pricing3d.style.display = 'none';
      } else {
        pricing2d.style.display = 'none';
        pricing3d.style.display = 'grid';
      }
    });
  });
}

/* ==========================================================================
   3. Portfolio Lightbox Modal & Filtering
   ========================================================================== */

function openLightbox(src, title, sub) {
  const modal = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const subEl = document.getElementById('lightbox-sub');

  if (!modal || !img) return;

  img.src = src;
  img.alt = title;
  titleEl.textContent = title;
  subEl.textContent = sub;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('lightbox');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
}
