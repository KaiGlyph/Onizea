function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 30; // ajusta para más/menos velocidad

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 25);
      } else {
        counter.innerText = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counter);
  });
}

// Animación de aparición al hacer scroll
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

// Menú Hamburguesa
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const body = document.body;

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    mainNav.classList.toggle('active');
    body.classList.toggle('menu-open');

    // Prevenir scroll del body cuando el menú está abierto
    if (!isExpanded) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Cerrar menú al hacer clic en un enlace
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    });
  });

  // Cerrar menú al hacer clic fuera (en el overlay)
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    }
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('active');
      body.classList.remove('menu-open');
      body.style.overflow = '';
    }
  });
}

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateOnScroll();
  initMobileMenu();
});