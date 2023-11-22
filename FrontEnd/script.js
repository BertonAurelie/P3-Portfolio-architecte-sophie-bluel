const tableaux = await fetch("http://localhost:5678/api/works");
const pieces =  await tableaux.json();

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
        imageElement.id=article.id;//pour delete surement sur l'icone

        const titleElement=document.createElement("figcaption");
        titleElement.innerText = article.title;
   
        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    } 

} 
 
afficherGallery(pieces)

const boutonObjets = document.getElementById("objets");
boutonObjets.addEventListener("click", function(){
    console.log("vous avez cliqué objets")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre.categoryId == 1 ;
    })
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})

const boutonDefault = document.getElementById("default");
boutonDefault.addEventListener("click", function(){
    console.log("vous avez cliqué Default")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre ;
    })
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})

const boutonAppartements = document.getElementById("Appartements");
boutonAppartements.addEventListener("click", function(){
    console.log("vous avez cliqué Appartements")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre.categoryId == 2 ;
    })
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
    
})

const boutonHotelsRestaurants = document.getElementById("hotelsRestaurants");
boutonHotelsRestaurants.addEventListener("click", function(){
    console.log("vous avez cliqué hotelsRestaurants")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre.categoryId == 3 ;
    })
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})

let modal= null;

const openModal=function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display=null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-button-close-modal").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}


const closeModal=function (e) {
    if( modal === null ) return;
    e.preventDefault();
    modal.style.display= "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-button-close-modal").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
})

async function afficherGalleryModal(pieces) {
    
    for (let i = 0; i < pieces.length; i++ ) {
        let article = pieces[i];

        // Récupération de l'élément du DOM(div gallery) qui accueillera les tableaux
        const sectionGallery = document.querySelector(".gallery-modal")
        
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement ("div")
        projetElement.className="projet"

        // Création des balises qui composent le projet
        const imageElement=document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.id=article.id;//pour delete surement sur l'icone

        const deleteElement=document.createElement("button");
        deleteElement.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        deleteElement.className="button-icon-delete"
        deleteElement.id="button-icon-delete-" + article.id;
   
        sectionGallery.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(deleteElement);
        
    } 

} 
 
afficherGalleryModal(pieces)



