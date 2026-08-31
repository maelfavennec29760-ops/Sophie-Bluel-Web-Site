//Modale Galerie photo

//Récuperer les travaux via l'API
import { getWorks } from "./api.js";
import { galleryGenerator } from "./galleryGenerator.js";

// ==============================
// Éléments du DOM
// ==============================

// Modale galerie
const modifyLink = document.querySelector(".portfolio-title a");
const modalContainer = document.querySelector(".modal-container");
const modalWindow = document.querySelector(".modal-window");
const modalClose = document.querySelector(".modal-close");
const modalGallery = document.querySelector(".modal-gallery");

// Modale ajout
const modalAdd = document.querySelector(".modal-add");
const modalAddBtn = document.querySelector(".modal-add-btn");
const modalAddBack = document.querySelector(".modal-back");
const modalAddClose = document.querySelector(".modal-add-close");

// Formulaire
const imageInput = document.getElementById("project-img");
const previewImg = document.getElementById("preview-img");
const titleInput = document.getElementById("title");
const categorySelect = document.getElementById("categories");
const validationBtn = document.querySelector(".valide");
const validateMessage = document.getElementById("validate")
const errorMessage = document.getElementById("errorAdd")


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
    modalGallery.innerHTML = "";
    modalWorks.forEach(work => {
        const figure = document.createElement("figure");
        modalGallery.appendChild(figure);
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

async function initModalGallery() {
    const works = await getWorks();
    modalWorksGenerator(works);
    trashIdWorks();
}

initModalGallery();

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
        const works = await getWorks();
        galleryGenerator(works);
        modalWorksGenerator(works);
        trashIdWorks();
    }
}

trashIdWorks();


//Modale ajout de photo

//Modale ajout de photo affichage

//Afficher la modale add et cacher la precedente
modalAddBtn.addEventListener("click", () => {
    modalAdd.classList.remove("hidden");
    modalWindow.classList.add("hidden");
})

//Retour en arriere
modalAddBack.addEventListener("click", () => {
    resetModalAdd()

    modalAdd.classList.add("hidden");
    modalWindow.classList.remove("hidden");
})

//Fermer la modale add 
modalAddClose.addEventListener("click", () => {
    resetModalAdd()

    modalContainer.classList.add("hidden");
})

//Ajout de la liste categories dans la modale add 


async function loadCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const selectedCategory = await response.json();
    for (let i = 0; i < selectedCategory.length; i++) {
        const options = document.createElement("option");
        options.value = selectedCategory[i].id;
        options.innerText = selectedCategory[i].name;

        categorySelect.appendChild(options);
    }
}

loadCategories();

//Ajout d'une image

async function addPicture() {

    const file = imageInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;


    const formData = new FormData();

    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);

    const token = localStorage.getItem("token");

    const response = await fetch ("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData,
    })
    if(response.ok){
        validateMessage.classList.remove("hidden");

        setTimeout(() => {
            validateMessage.classList.add("hidden")
        }, 3000);

        const works = await getWorks();
        galleryGenerator(works);
        modalWorksGenerator(works);
        trashIdWorks();
        resetModalAdd();
    } else {
        errorMessage.classList.remove("hidden")
        setTimeout(() => {
            errorMessage.classList.add("hidden")
        }, 3000)
    }
}

//Activation du bouton, "disabled" par défaut

function checkFormValidity() {
    const file = imageInput.files[0];
    const title = titleInput.value;
    const category = categorySelect.value;

    const hasImg = file !== undefined;
    const hasTitle = title.trim() !== "";
    const hasCategory = category !== "0";

    if(hasImg && hasTitle && hasCategory){
        validationBtn.disabled = false
    } else {
        validationBtn.disabled = true
    }
}
imageInput.addEventListener("change", checkFormValidity);
titleInput.addEventListener("input", checkFormValidity);
categorySelect.addEventListener("change", checkFormValidity);
checkFormValidity();

//Appel de la fonction lord du click sur le bouton "Validé"

validationBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addPicture()
})

//Previsualisation de l'image dans l'input
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        previewImg.classList.remove("hidden");
        const imgUrl = URL.createObjectURL(file);
        previewImg.src = imgUrl;
    }
});

//Vider la modal add lorsque que l'on quitte ou que l'on revient en arriere

function resetModalAdd() {

    imageInput.value = "";
    titleInput.value = "";
    categorySelect.value = "0";
    previewImg.src = ""
    previewImg.classList.add("hidden");
    
    checkFormValidity();
}

