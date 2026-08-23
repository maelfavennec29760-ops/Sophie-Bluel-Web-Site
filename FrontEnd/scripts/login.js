const errorP = document.getElementById("error")
const formLogin = document.querySelector("form")

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputEmail = document.getElementById("email");
    const valueEmail = inputEmail.value;
    const inputPassword = document.getElementById("password");
    const valuePassword = inputPassword.value;

    const loginData = {email: valueEmail, password: valuePassword}

    const response = await fetch ("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData)
    })
    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token)
        window.location.href="index.html"
    } else {
        errorP.innerText = "Erreur dans l'identifiant ou le mot de passe"
    }
    
})

