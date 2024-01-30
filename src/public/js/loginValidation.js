let formulario = document.getElementById("loginForm");

formulario.addEventListener("submit", function (e) {
  const errores = {};
  const inputEmail = document.getElementById("txfEmail");
  const inputPassword = document.getElementById("txfPassword");

  const erLogin = document.getElementById("erLogin");

  if (inputEmail.value.trim() < 1 || inputPassword.value.trim() < 1) {
    errores.login = "Completa todos los campos.";
  }

  if (Object.keys(errores).length >= 1) {
    e.preventDefault();
    erLogin.innerText = errores.login ? errores.login : "";
  }
});
