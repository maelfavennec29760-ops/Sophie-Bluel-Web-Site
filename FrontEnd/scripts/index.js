//Affichage mode édition quand l'utilisateur admin est connecté
const token = localStorage.getItem("token");
    if(token) {
        const portfolioTitle = document.querySelector(".portfolio-title");
        const linkModify = document.createElement("a");
        
        const iconeModify = document.createElement("i");
        iconeModify.classList.add("fa-regular", "fa-pen-to-square");

        const textModify = document.createElement("span");
        textModify.innerText = "Modifier";
        
        portfolioTitle.appendChild(linkModify);
        linkModify.appendChild(iconeModify);
        linkModify.appendChild(textModify);
    }