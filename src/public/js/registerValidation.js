window.addEventListener("load", function() {
    let formulario = document.querySelector("#registrationForm");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();


        let firstName = formulario.querySelector("txfFirstName").value;
        let lastName = formulario.querySelector("txfLastName").value;
        let email = formulario.querySelector("txfEmail").value;
        let password = formulario.querySelector("txfPassword").value;

        if (!firstName || !lastName || !email || !password){
            alert("Todos los campos son obligatorios.");
        }else if(firstName.value.length < 3){
            alert("El campo de nombre debe tener al menos 3 caracteres")
        }else if(lastName.value.length < 3){
            alert("El campo de apellido debe tener al menos 3 caracteres")
        }else if(password.value.length < 3){
            alert("La contraseña debe tener al menos 8 caracteres")
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Correo electrónico no válido');
        }
    })
})