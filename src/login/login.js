const password = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');

passwordToggle.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
  passwordToggle.innerHTML = `<i class="bi ${isHidden ? 'bi-eye-slash' : 'bi-eye'}" aria-hidden="true"></i>`;
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  form.classList.add('was-validated');

  if (!form.checkValidity()) return;

  window.location.href = '../app/dashboard/index.html';
});
