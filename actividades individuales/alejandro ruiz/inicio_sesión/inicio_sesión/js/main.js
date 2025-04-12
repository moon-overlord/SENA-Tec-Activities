document.addEventListener("DOMContentLoaded", function() {
  // Referencias a contenedores y enlaces para alternar formularios
  const registerContainer = document.getElementById('registerContainer');
  const loginContainer = document.getElementById('loginContainer');
  const toLogin = document.getElementById('toLogin');
  const toRegister = document.getElementById('toRegister');

  // Cambio entre formularios
  toLogin.addEventListener('click', function() {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  });

  toRegister.addEventListener('click', function() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
  });

  // Función para registrar un usuario
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const confirmPassword = document.getElementById('regConfirmPassword').value.trim();

    // Validación de campos vacíos
    if (username === '' || password === '' || confirmPassword === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Guardar credenciales en localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    // Limpiar campos y mostrar el formulario de inicio de sesión
    registerForm.reset();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
  });

  // Función para iniciar sesión
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username === '' || password === '') {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // Validar credenciales
    if (username === storedUsername && password === storedPassword) {
      alert('Inicio de sesión exitoso.');
      // Aquí se puede redirigir a otra página o realizar otra acción
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  });
});
