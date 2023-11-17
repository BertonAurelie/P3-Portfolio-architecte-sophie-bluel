let formLogin= document.getElementById("formLogin");

    let checkMail= new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+$");

formLogin.addEventListener("submit",async function(event) {
    let email= document.getElementById("email-input");
    let password= document.getElementById("password-input");

    // Création de l’authentificateur login
    const body = {
        email: email.value,
        password: password.value
    };
    event.preventDefault()
    if(!checkMail.test(email.value)){
        alert("veuillez entrer une adresse email valide");
        
    } else {
        // Création de la charge utile au format JSON
        const bodyString = JSON.stringify(body);

        // Appel de la fonction fetch avec toutes les informations nécessaires
        const loginResponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "accept": "application/json","Content-Type": "application/json" },
            body: bodyString
        });
        if (loginResponse.ok){
            const loginBody = await loginResponse.json();
            const token = loginBody.token;

            document.location.href="index.html";
        }else {
            password.value = "";
            alert("e-mail ou mot de passe incorrect")

        }
    }

})
