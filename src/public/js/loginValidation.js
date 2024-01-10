window.addEventListener("load", function() {
    let formulario = document.querySelector("#loginForm");

    formulario.addEventListener("submit", function(event) {
        let email = document.querySelector("#txfEmail").value;
        let password = document.querySelector("#txfPassword").value;

        if (email === "" || password === "") {
          alert("Por favor, complete todos los campos.");
          event.preventDefault(); 
        }
      });
})