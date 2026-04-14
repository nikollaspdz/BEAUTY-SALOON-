/* ============================================================
   MT BEAUTY ROOM — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Sticky Header ---- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile Nav Toggle ---- */
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav    = document.getElementById('main-nav');

  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function openMenu() {
    mainNav.classList.add('open');
    overlay.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    animateHamburger(true);
  }

  function closeMenu() {
    mainNav.classList.remove('open');
    overlay.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    animateHamburger(false);
  }

  function animateHamburger(open) {
    const spans = menuToggle.querySelectorAll('span');
    if (open) {
      spans[0].style.cssText = 'transform: translateY(6.5px) rotate(45deg)';
      spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
      spans[2].style.cssText = 'transform: translateY(-6.5px) rotate(-45deg)';
    } else {
      spans.forEach(s => s.style.cssText = '');
    }
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.contains('open') ? closeMenu() : openMenu();
    });
    overlay.addEventListener('click', closeMenu);
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === currentPage || (currentPage === '' && href === 'index.html'));
  });

  /* ---- Scroll-Reveal Animations ---- */
  const revealEls = document.querySelectorAll(
    '.treatment-card, .testimonial-card, .ba-card, .why-item, .service-block, .price-category, .contact-card'
  );

  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  /* ---- Services Page Nav Highlight ---- */
  const srvNavBtns = document.querySelectorAll('.srv-nav-btn');
  if (srvNavBtns.length) {
    const sections = ['laser', 'facial', 'lash', 'antiaging'].map(id => document.getElementById(id)).filter(Boolean);

    const srvObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          srvNavBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.section === id));
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => srvObserver.observe(s));

    srvNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.section);
        if (target) {
          const offset = document.querySelector('.services-nav')?.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.scrollY - 76 - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---- WhatsApp FAB pulse stop on scroll ---- */
  const fab = document.getElementById('whatsapp-fab');
  if (fab) {
    window.addEventListener('scroll', () => {
      // Re-trigger animation on scroll stop
    }, { passive: true });
  }

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Price page: animate numbers ---- */
  const priceEls = document.querySelectorAll('.price-item-price');
  if (priceEls.length && 'IntersectionObserver' in window) {
    const priceObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.5s ease both';
          priceObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    priceEls.forEach(el => priceObs.observe(el));
  }

});
