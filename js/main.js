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

// Iniciar cuando la página cargue
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateOnScroll();
});