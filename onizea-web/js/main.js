// js/main.js
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Aquí conectarás con Power Automate
  // Por ahora, muestra un mensaje
  alert('¡Gracias! Pronto nos pondremos en contacto.');
  this.reset();
});