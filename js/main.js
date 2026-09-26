// gestorRecursos — interacciones básicas del frontend
// Todo el envío de formularios es simulado: no hay backend conectado aún.

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menú móvil (landing) ----
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');

  if (header && menuToggle) {
    menuToggle.addEventListener('click', () => {
      header.classList.toggle('nav-open');
    });
  }

  // ---- Formulario de login ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!loginForm.checkValidity()) {
        loginForm.reportValidity();
        return;
      }
      showStatus('formStatus', 'Inicio de sesión simulado correctamente.');
    });
  }

  // ---- Formulario de registro ----
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const contrasena = document.getElementById('contrasena');
      const confirmar = document.getElementById('confirmar');
      const hint = document.getElementById('passwordHint');

      if (!registroForm.checkValidity()) {
        registroForm.reportValidity();
        return;
      }

      if (contrasena.value !== confirmar.value) {
        hint.textContent = 'Las contraseñas no coinciden.';
        hint.style.color = '#b23a2e';
        confirmar.focus();
        return;
      }

      hint.textContent = 'Mínimo 8 caracteres.';
      hint.style.color = '';
      showStatus('formStatus', 'Cuenta creada de forma simulada.');
    });
  }

  function showStatus(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.add('visible');
  }
});
