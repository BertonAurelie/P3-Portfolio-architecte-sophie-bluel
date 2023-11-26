let tableaux = await fetch("http://localhost:5678/api/works");
let pieces =  await tableaux.json();

////////////////////////////////////////////////
//           Afficher la galerie             // 
//////////////////////////////////////////////

async function afficherGallery(pieces) {

    // Récupération de l'élément du DOM(div gallery) qui accueillera les tableaux
    const sectionGallery2 = document.querySelector(".gallery")

    sectionGallery2.innerText="";

    for (let i = 0; i < pieces.length; i++ ) {
        let article = pieces[i];

        
        // Création d’une balise dédiée à un projet
        const projetElement = document.createElement ("projet")

        // Création des balises qui composent le projet
        const imageElement=document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.id=article.id;//pour delete surement sur l'icone

        const titleElement=document.createElement("figcaption");
        titleElement.innerText = article.title;
   
        sectionGallery2.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    } 

} 
 
afficherGallery(pieces)

////////////////////////////////////////////////
//           Boutons pour filtrer            // 
//////////////////////////////////////////////

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


////////////////////////////////////////////////
//           Modale suppression              // 
//////////////////////////////////////////////

let modal= null;

const openModal=function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display=null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    showDeleteDiv();  
    modal = target;
    modal.addEventListener("click", closeModal);
    document.querySelectorAll(".js-button-close-modal").forEach(a => {
        a.addEventListener("click", closeModal);
    })
    document.querySelectorAll(".js-modal-stop").forEach(a => {
        a.addEventListener("click", stopPropagation);
    })
}

const closeModal=async function (e) {
    if( modal === null ) return;
    e.preventDefault();
    modal.style.display= "none";
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal)
    document.querySelectorAll(".js-button-close-modal").forEach(a => {
        a.removeEventListener("click", closeModal);
        document.querySelector(".form-add-project").reset()
    })
    document.querySelectorAll(".js-modal-stop").forEach(a => {
        a.removeEventListener("click", stopPropagation);
        document.querySelector(".form-add-project").reset()
    })
    modal = null;
    tableaux = await fetch("http://localhost:5678/api/works");
    pieces =  await tableaux.json();
    afficherGallery(pieces);
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
})

function showDeleteDiv() {
    const modalAdd = document.getElementById("add-div");
    modalAdd.style.display="none";
    const DeleteDiv = document.getElementById("delete-div");
    DeleteDiv.style.display=null;
    afficherGalleryModal(pieces);
}


function showAddDiv() {
    const DeleteDiv = document.getElementById("delete-div");
    DeleteDiv.style.display="none";
    const modalAdd = document.getElementById("add-div");
    modalAdd.style.display=null;
}

const addButton = document.querySelector(".button-to-modal-ajout")
addButton.addEventListener("click", function() {
    showAddDiv();
})


const previousToModalDelete = document.querySelector(".button-to-modal-delete");
previousToModalDelete.addEventListener("click", function() {/* 
    event.preventDefault();
    event.stopPropagation(); */
    showDeleteDiv();
})

///////////////////////////////////////////////////////////
//      Afficher la galerie Modale + suppression        // 
/////////////////////////////////////////////////////////

async function afficherGalleryModal(pieces) {
    // Récupération de l'élément du DOM(div gallery) qui accueillera les tableaux
    const sectionGallery = document.querySelector(".gallery-modal")

    sectionGallery.innerText="";

    for (let i = 0; i < pieces.length; i++ ) {
        let article = pieces[i];
      
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


        deleteElement.addEventListener("click", async function(event){
            event.preventDefault()
            event.stopPropagation();
            const deleteUrl = "http://localhost:5678/api/works/" + article.id
            const token =  "Bearer " + sessionStorage.getItem("token");
            const deleteResponse = await fetch(deleteUrl, {
            method: "DELETE",
            headers: { "accept": "*/*", "Authorization": token}
            });

            if (deleteResponse.ok){
                tableaux = await fetch("http://localhost:5678/api/works");
                pieces =  await tableaux.json();
                afficherGalleryModal(pieces);
                afficherGallery(pieces);

            }else {
                alert("e-mail ou mot de passe incorrect")
    
            }
            
        })
        
    } 

} 


////////////////////////////////////////////////
//          Modale Ajout de projets          // 
//////////////////////////////////////////////

//Récupérer des fichiers grâce à l'input caché 
const fileButton = document.getElementById("fileButton");
const fileInput = document.getElementById("fileInput");

fileButton.addEventListener("click",(e) => {
    if (fileInput) {
        fileInput.click();
    }
  },
  false,
); 

fileInput.addEventListener("change",function() {
    let image = document.getElementById("fileInput").files[0];

    let reader = new FileReader();
    let imageDiv = document.createElement("img");

    reader.onload = function(e) {
        imageDiv.src = e.target.result;
    }

    const divAddPictures = document.querySelector(".add-pictures");
    divAddPictures.innerHTML = "";

    reader.readAsDataURL(image);
    divAddPictures.appendChild(imageDiv);

})
