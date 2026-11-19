const password = document.getElementById('password');
const passwordToggle = document.getElementById('passwordToggle');
const registrationForm = document.getElementById('registrationForm');

passwordToggle.addEventListener('click', () => {
  const isHidden = password.type === 'password';
  password.type = isHidden ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', isHidden ? 'Ocultar senha' : 'Mostrar senha');
  passwordToggle.innerHTML = `<i class="bi ${isHidden ? 'bi-eye' : 'bi-eye-slash'}" aria-hidden="true"></i>`;
});

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    registrationForm.classList.add('was-validated');
    return;
  }

  const submitButton = registrationForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" aria-hidden="true"></span><span>Cadastrando...</span>';
});
