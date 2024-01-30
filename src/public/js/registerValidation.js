let formulario = document.getElementById("registrationForm");

formulario.addEventListener("submit", function (e) {
  const errores = {};

  const inputFirstName = document.getElementById("txfFirstName");
  const inputLastName = document.getElementById("txfLastName");
  const inputEmail = document.getElementById("txfEmail");
  const inputPassword = document.getElementById("txfPassword");

  const erFirstName = document.getElementById("erFirstName");
  const erLastName = document.getElementById("erLastName");
  const erEmail = document.getElementById("erEmail");
  const erPassword = document.getElementById("erPassword");

  if (inputFirstName.value.trim().length < 1) {
    errores.firstName = "Este campo debe estar completo";
  }
  if (inputLastName.value.trim().length < 1) {
    errores.lastName = "Este campo debe estar completo";
  }
  if (inputEmail.value.trim().length < 1) {
    errores.email = "Este campo debe estar completo";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail.value.trim())) {
      errores.email = "Correo electrónico no válido";
    }
  }
  if (inputPassword.value.trim() < 1) {
    errores.password = "Este campo debe estar completo";
  }

  if (Object.keys(errores).length >= 1) {
    e.preventDefault();
    erFirstName.innerText = errores.firstName ? errores.firstName : "";
    erLastName.innerText = errores.lastName ? errores.lastName : "";
    erEmail.innerText = errores.email ? errores.email : "";
    erPassword.innerText = errores.password ? errores.password : "";
  }
});
