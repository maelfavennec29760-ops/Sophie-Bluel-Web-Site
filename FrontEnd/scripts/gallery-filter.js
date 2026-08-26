//Imports
import {works, categories} from "./api.js";
import { galleryGenerator } from "./galleryGenerator.js";

// Génération du bouton TOUS (afficher les travaux sans filtre)
    const containerFilter = document.querySelector(".container-filter");
    const tous = document.createElement("button");
    tous.innerText = "Tous";
    tous.addEventListener("click", () => {
        effectButton(tous);
        galleryGenerator(works);
    });
    containerFilter.appendChild(tous);

//Génération des boutons pour le filtre par catégorie
function buttonsGenerator () {
    const containerFilter = document.querySelector(".container-filter");
    for(let i = 0; i < categories.length; i++ ){
        const button = document.createElement("button");
        button.innerText = categories[i].name;
        
        button.addEventListener("click", () => {
            const filteredWorks = categoriesFilter(categories[i].id);
            effectButton(button);
            galleryGenerator(filteredWorks);
        })
        containerFilter.appendChild(button);
    } 
}
buttonsGenerator();

//Effet active
function effectButton(button) {
    const buttonEffect = document.querySelectorAll("button")
    for(let i = 0; i < buttonEffect.length; i++) {
        buttonEffect[i].classList.remove("active")
    }
    button.classList.add("active")
}

//Gestion du filtre par catergories
function categoriesFilter(categoryId) {
    const filteredWorks = [];
    for(let i = 0; i < works.length; i++) {
        if(works[i].categoryId === categoryId) {
            filteredWorks.push(works[i]);
        }
    }
    return filteredWorks;
}

