//Modale Galerie photo

//Récuperer les travaux via l'API
import {works} from "./api.js";
import { galleryGenerator } from "./galleryGenerator.js";

//Récuperer les élements necéssaires
const modifyLink = document.querySelector(".portfolio-title a");
const modalContainer = document.querySelector(".modal-container");
const modalWindow = document.querySelector(".modal-window");
const modalClose = document.querySelector(".modal-close");
const modalGallery = document.querySelector(".modal-gallery");

//Afficher la modale

    // Évite une erreur lorsque l'utilisateur n'est pas connecté

if (modifyLink) {
modifyLink.addEventListener("click", () => {
    modalContainer.classList.remove("hidden");
    modalWindow.classList.remove("hidden");
    modalAdd.classList.add("hidden");
});
}

//Fermer la modale
modalClose.addEventListener("click", () => {
    modalContainer.classList.add("hidden");
})

//Fermer la modale en cliquant en dehors de sa window
modalContainer.addEventListener("click", (event) => {
    if(event.target === modalContainer) {
        modalContainer.classList.add("hidden");
    }
})

//Générer les travaux avec l'icone corbeille en haut a droite

function modalWorksGenerator(modalWorks) {
    const gallery = document.querySelector(".modal-gallery");
    gallery.innerHTML = "";
    modalWorks.forEach(work => {
        const figure = document.createElement("figure");
        gallery.appendChild(figure);
        const img = document.createElement("img");
        img.src = work.imageUrl;
        const trashBtn = document.createElement("button");
        trashBtn.classList.add("trash-btn");
        trashBtn.id = work.id;
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");

        figure.appendChild(img);
        trashBtn.appendChild(trash);
        figure.appendChild(trashBtn);
    });
}

modalWorksGenerator(works);

//Suppression travaux 

//Récuperer l'id associé au bouton
function trashIdWorks() {
    const trashBtn = document.querySelectorAll(".trash-btn");
    for(let i = 0; i < trashBtn.length; i++){
        trashBtn[i].addEventListener("click", () => {
            console.log(trashBtn[i].id);
            deleteWork(trashBtn[i].id);
        })

    }

}

//Suppression
async function deleteWork(id) {
    const token = window.localStorage.getItem("token");
    const workDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization : `Bearer ${token}`
        }
    }) 
    if (workDelete.ok) {
        const refreshedWorks = await refreshWorks();
        galleryGenerator(refreshedWorks);
        modalWorksGenerator(refreshedWorks);
        
    }
}

//Afficher la liste de travaux avec les modifications
async function refreshWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const refreshedWorks = await response.json();
    return refreshedWorks;
}

trashIdWorks();


//Modale ajout de photo

const modalAdd = document.querySelector(".modal-add");
const modalAddBtn = document.querySelector(".modal-add-btn");
const modalAddback = document.querySelector(".modal-back");
const modalAddClose = document.querySelector(".modal-add-close");

//Modale ajout de photo affichage

//Afficher la modale add et cacher la precedente
modalAddBtn.addEventListener("click", () => {
    modalAdd.classList.remove("hidden");
    modalWindow.classList.add("hidden");
})

//Retour en arriere
modalAddback.addEventListener("click", () => {
    modalAdd.classList.add("hidden");
    modalWindow.classList.remove("hidden");
})

//Fermer la modale add 
modalAddClose.addEventListener("click", () => {
    modalContainer.classList.add("hidden");
})

//Ajout de la liste categories dans la modale add 


async function categorySelect() {

    const categories = document.getElementById("categories");
    const response = await fetch("http://localhost:5678/api/categories");
    const selectedCategory = await response.json();

    for(let i = 0; i < selectedCategory.length; i++){

        const options = document.createElement("option");
        options.value = selectedCategory[i].id 
        options.innerText = selectedCategory[i].name;
        categories.appendChild(options);
    }
}

categorySelect();