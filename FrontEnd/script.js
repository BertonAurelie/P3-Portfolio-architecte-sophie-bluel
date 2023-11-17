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
        //console.log(imageElement)

        const titleElement=document.createElement("figcaption");
        titleElement.innerText = article.title;
        //console.log(titleElement)
   
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
    console.log(objetsFiltres);

    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})

const boutonDefault = document.getElementById("default");
boutonDefault.addEventListener("click", function(){
    console.log("vous avez cliqué Default")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre ;
    })
    //console.log(objetsFiltres);
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})

const boutonAppartements = document.getElementById("Appartements");
boutonAppartements.addEventListener("click", function(){
    console.log("vous avez cliqué Appartements")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre.categoryId == 2 ;
    })
    //console.log(objetsFiltres);
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
    
})

const boutonHotelsRestaurants = document.getElementById("hotelsRestaurants");
boutonHotelsRestaurants.addEventListener("click", function(){
    console.log("vous avez cliqué hotelsRestaurants")
    const objetsFiltres = pieces.filter(function(objetfiltre) {
        return objetfiltre.categoryId == 3 ;
    })
    //console.log(objetsFiltres);
    document.querySelector(".gallery").innerHTML = "";
    afficherGallery(objetsFiltres)
})



