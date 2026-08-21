//Recuperer les données des travaux via l'API
const reponseWorks = await fetch("http://localhost:5678/api/works");
export const works = await reponseWorks.json();

//Recuperer les donnée des catégories via l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories") 
export const categories = await reponseCategories.json();
