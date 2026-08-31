//Imports
import {getWorks} from "./api.js";

export function galleryGenerator(workToDisplay) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""
    workToDisplay.forEach(work => {
        const figure = document.createElement("figure")
        gallery.appendChild(figure)
        const img = document.createElement("img")
        img.src = work.imageUrl;
        const figcaptation = document.createElement("figcaption")
        figcaptation.innerText = work.title

        figure.appendChild(img);
        figure.appendChild(figcaptation);
    });
}

async function initGallery() {
    const works = await getWorks();
    galleryGenerator(works);
}

initGallery()