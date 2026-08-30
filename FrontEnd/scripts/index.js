//Affichage mode édition quand l'utilisateur admin est connecté
const token = localStorage.getItem("token");
if (token) {
    //Logout
    const logout = document.querySelectorAll("nav a")[2]
    logout.innerText = "logout"
    logout.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("token")
        window.location.href = "index.html"
    })
    
    //Bandeau mode édition
    const editionMod = document.createElement("div");
    editionMod.classList.add("edition-mode");
    const editionModIcon = document.createElement("i");
    editionModIcon.classList.add("fa-regular", "fa-pen-to-square");
    const editionModSpan = document.createElement("span");
    editionModSpan.innerText = "Mode édition";

    document.body.prepend(editionMod)
    editionMod.appendChild(editionModIcon)
    editionMod.appendChild(editionModSpan)

    //Lien modifier pour la modale
    const portfolioTitle = document.querySelector(".portfolio-title");
    const linkModify = document.createElement("a");
    const iconeModify = document.createElement("i");
    iconeModify.classList.add("fa-regular", "fa-pen-to-square");
    const textModify = document.createElement("span");
    textModify.innerText = "Modifier";

    portfolioTitle.appendChild(linkModify);
    linkModify.appendChild(iconeModify);
    linkModify.appendChild(textModify);

    //Ajout class "hidden" sur le "container-filter" pour faire disparaitre les boutons quand l'utilisateur admin est connecté
    const containerButton = document.querySelector(".container-filter")
    containerButton.classList.add("hidden")

    //Ajout de marge pour le container "portfolio-title"
    const marginBottom = document.querySelector(".portfolio-title")
    marginBottom.classList.add("margin")

}


