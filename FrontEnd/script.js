const tableaux = await fetch("http://localhost:5678/api/works");
const pieces = await tableaux.json();
console.log(pieces)

async function afficherGallery(pieces) {
    for (let i = 0; i < pieces.length; i++ ) {
        let article = pieces[i];

        // Récupération de l'élément du DOM(div gallery) qui accueillera les tableaux
        const sectionGallery = document.querySelector(".gallery")
        
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement ("projet")

        // Création des balises qui composent le projet
        const imageElement=document.createElement("img");
        imageElement.src = article.imageUrl;
        console.log(imageElement)

        const titleElement=document.createElement("figcaption");
        titleElement.innerText = article.title;
        console.log(titleElement)

        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    } 

} 
 
afficherGallery(pieces)

