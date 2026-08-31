//Recuperer les données des travaux via l'API
//const reponseWorks = await fetch("http://localhost:5678/api/works");
//export let works = await reponseWorks.json();
export async function getWorks(){
    const works = await fetch("http://localhost:5678/api/works", {
        method: "GET",
    })
    if(works.ok){
        const data = await works.json()
        return data
    } else {
        console.log("error")
    }
}



//Recuperer les donnée des catégories via l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories") 
export const categories = await reponseCategories.json();
