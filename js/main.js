// gestorRecursos — interacciones básicas del frontend
// Todo el envío de formularios es simulado: no hay backend conectado aún.

document.addEventListener('DOMContentLoaded', () => {

  // ---- Menú móvil (landing) ----
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');

  if (header && menuToggle) {
    const closeMenu = () => {
      header.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    header.querySelectorAll('.main-nav a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // ---- Mostrar / ocultar contraseña ----
  // Cada botón .toggle-pass controla el input indicado en aria-controls.
  document.querySelectorAll('.toggle-pass').forEach((btn) => {
    const input = document.getElementById(btn.getAttribute('aria-controls'));
    if (!input) return;
    const nombre = btn.getAttribute('aria-label').replace(/^Mostrar /, '');

    // Evita que el input pierda el foco al hacer clic (y que se dispare
    // la validación "al salir del campo" sin que el usuario haya terminado).
    btn.addEventListener('mousedown', (e) => e.preventDefault());

    btn.addEventListener('click', () => {
      const mostrar = input.type === 'password';
      input.type = mostrar ? 'text' : 'password';
      btn.textContent = mostrar ? 'Ocultar' : 'Mostrar';
      btn.setAttribute('aria-pressed', String(mostrar));
      btn.setAttribute('aria-label', (mostrar ? 'Ocultar ' : 'Mostrar ') + nombre);
    });
  });

  // ---- Validación en línea ----
  // Devuelve el mensaje de error del campo, o '' si está bien.
  function getError(input) {
    const v = input.validity;
    if (input.id === 'correo') {
      if (v.valueMissing) return 'Escribe tu correo.';
      if (v.typeMismatch) return 'Escribe un correo válido, por ejemplo nombre@uao.edu.co.';
    }
    if (input.id === 'nombre' && v.valueMissing) return 'Escribe tu nombre completo.';
    if (input.id === 'contrasena') {
      if (v.valueMissing) return 'Escribe tu contraseña.';
      if (v.tooShort) return 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (input.id === 'confirmar') {
      if (v.valueMissing) return 'Confirma tu contraseña.';
      const pass = document.getElementById('contrasena');
      if (pass && input.value !== pass.value) return 'Las contraseñas no coinciden.';
    }
    if (input.id === 'terminos' && v.valueMissing) return 'Debes aceptar los términos de uso para continuar.';
    return '';
  }

  // Muestra u oculta el error de un campo. Devuelve true si el campo es válido.
  function validateField(input) {
    const field = input.closest('.field');
    const errorEl = document.getElementById(input.id + '-error');
    if (!field || !errorEl) return true;

    const message = getError(input);
    errorEl.textContent = message;
    field.classList.toggle('invalid', message !== '');
    input.setAttribute('aria-invalid', String(message !== ''));
    return message === '';
  }

  // Valida todos los campos del formulario y enfoca el primero con error.
  function validateForm(form) {
    const inputs = [...form.querySelectorAll('input')];
    const results = inputs.map((input) => validateField(input));
    const firstInvalid = inputs.find((_, i) => !results[i]);
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  // Validación mientras el usuario escribe.
  function attachLiveValidation(form) {
    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.closest('.field')?.classList.contains('invalid')) validateField(input);
      });
      input.addEventListener('change', () => validateField(input));
    });
  }

  // ---- Formulario de login ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    attachLiveValidation(loginForm);
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(loginForm)) return;
      showStatus('formStatus', 'Inicio de sesión simulado correctamente.');
    });
  }

  // ---- Formulario de registro ----
  const registroForm = document.getElementById('registroForm');
  if (registroForm) {
    attachLiveValidation(registroForm);

    // Si cambia la contraseña, revalida "confirmar" (si ya tiene algo escrito).
    const contrasena = document.getElementById('contrasena');
    const confirmar = document.getElementById('confirmar');
    contrasena.addEventListener('input', () => {
      if (confirmar.value) validateField(confirmar);
    });

    registroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm(registroForm)) return;
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