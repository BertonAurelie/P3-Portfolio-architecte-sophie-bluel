let lastFilter = -1;


async function afficherGalleryAJour(lastFilter) {
    let tableaux = await fetch("http://localhost:5678/api/works");
    let pieces =  await tableaux.json();

    if (lastFilter !== -1){
        pieces = pieces.filter(function(piece) {
            return piece.categoryId == lastFilter;
        })
    }

    afficherGallery(pieces)
}

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
        imageElement.crossOrigin="anonymous";

        const titleElement=document.createElement("figcaption");
        titleElement.innerText = article.title;
   
        sectionGallery2.appendChild(projetElement);
        projetElement.appendChild(imageElement);
        projetElement.appendChild(titleElement);
    } 

} 
 
afficherGalleryAJour(lastFilter);

////////////////////////////////////////////////
//           Boutons pour filtrer            // 
//////////////////////////////////////////////
const boutonDefault = document.getElementById("default");
boutonDefault.addEventListener("click", function(){
    document.getElementById("default").className="button-focus";
    document.getElementById("Appartements").className="button-unfocus";
    document.getElementById("objets").className="button-unfocus";
    document.getElementById("hotelsRestaurants").className="button-unfocus";
    console.log("vous avez cliqué Default")
    lastFilter = -1;

    afficherGalleryAJour(lastFilter);
})

const boutonObjets = document.getElementById("objets");
boutonObjets.addEventListener("click", function(){
    document.getElementById("objets").className="button-focus";
    document.getElementById("Appartements").className="button-unfocus";
    document.getElementById("hotelsRestaurants").className="button-unfocus";
    document.getElementById("default").className="button-unfocus";
    console.log("vous avez cliqué objets")
    lastFilter = 1;
    afficherGalleryAJour(lastFilter);
})



const boutonAppartements = document.getElementById("Appartements");
boutonAppartements.addEventListener("click", function(){
    document.getElementById("Appartements").className="button-focus";
    document.getElementById("hotelsRestaurants").className="button-unfocus";
    document.getElementById("objets").className="button-unfocus";
    document.getElementById("default").className="button-unfocus";
    console.log("vous avez cliqué Appartements")
    lastFilter = 2;
    afficherGalleryAJour(lastFilter);
    
})

const boutonHotelsRestaurants = document.getElementById("hotelsRestaurants");
boutonHotelsRestaurants.addEventListener("click", function(){
    document.getElementById("hotelsRestaurants").className="button-focus";
    document.getElementById("Appartements").className="button-unfocus";
    document.getElementById("objets").className="button-unfocus";
    document.getElementById("default").className="button-unfocus";
    console.log("vous avez cliqué hotelsRestaurants")
    lastFilter = 3;
    afficherGalleryAJour(lastFilter);
})


////////////////////////////////////////////////
//           open/close Modale               // 
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
    })
    document.querySelectorAll(".js-modal-stop").forEach(a => {
        a.removeEventListener("click", stopPropagation);
        document.querySelector(".form-add-project").reset();
      
        changeColorButtonAddProject();
    })
    modal = null;
    afficherGalleryAJour(lastFilter);
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
    afficherGalleryModal();
}


function showAddDiv() {
    const DeleteDiv = document.getElementById("delete-div");
    DeleteDiv.style.display="none";
    const modalAdd = document.getElementById("add-div");
    modalAdd.style.display=null;
}

const addButton = document.querySelector(".button-to-modal-ajout")
addButton.addEventListener("click", function() {
    document.querySelector(".form-add-project").reset();
    if (document.querySelector(".add-img-element")){
        document.querySelector(".add-img-element").remove();
        document.getElementById("div-add-previous-image").remove();
        document.querySelector(".input-add-picture").style.display = null;
    }
    document.getElementById("category").options.length=0;
    document.querySelector(".modal2-ajout").style.backgroundColor = '#A7A7A7';
    showAddDiv();
    showCategoryElement();
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

async function afficherGalleryModal() {
    let tableaux = await fetch("http://localhost:5678/api/works");
    let pieces =  await tableaux.json();

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
        imageElement.id=article.id;
        imageElement.crossOrigin="anonymous";

        const deleteElement=document.createElement("button");
        deleteElement.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        deleteElement.className="button-icon-delete";
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
                afficherGalleryAJour(lastFilter);

            }else {
                alert("e-mail ou mot de passe incorrect.")
    
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


//Afficher l'image projet sélectionné
fileInput.addEventListener("change",function() {
    let image = document.getElementById("fileInput").files[0];

    let reader = new FileReader();
    let imageDiv = document.createElement("img");
    imageDiv.className="add-img-element";

    reader.onload = function(e) {
        imageDiv.src = e.target.result;
    }

    const divAddPictures = document.querySelector(".add-pictures");
    const divFileButton = document.querySelector(".input-add-picture");
    
    const divAddPreviousImage = document.createElement("div");
    divAddPreviousImage.id="div-add-previous-image";
    divFileButton.style.display="none";
    reader.readAsDataURL(image);
    divAddPictures.appendChild(divAddPreviousImage);
    divAddPreviousImage.appendChild(imageDiv);

})

//afficher les catégories grâce à l'API
async function showCategoryElement() {
    //récupérer les catégories du swagger
    const optionResponse = await fetch ("http://localhost:5678/api/categories", {
        method : "GET",
        headers: {"accept" : "application/json" }
    });

    
    const optionBody = await optionResponse.json();
    
    for (let i = 0; i < optionBody.length; i++ ) {
        let add = optionBody[i];

        //Afficher les catégories
        const selectCategory = document.getElementById("category");
        const selectOption = document.createElement("option");
        selectOption.textContent = add.name;
        selectOption.id = add.id;
        selectOption.className = "option-category";

        selectCategory.appendChild(selectOption);
    }   
    
}



//changer la couleur du bouton valider un projet
const selectFormToAddProject = document.querySelector(".form-add-project");
selectFormToAddProject.addEventListener("change", function(event){
    event.preventDefault;
    event.stopPropagation;
    changeColorButtonAddProject();
})

function changeColorButtonAddProject() {
    const addElementButton = document.querySelector(".modal2-ajout");
    let image= document.getElementById("fileInput").value;
    let title= document.getElementById("title-input").value;
    let category= document.getElementById('category');    
    let valeurselectionnee = category.options[category.selectedIndex].id;

    console.log(image);
    console.log(title);
    console.log(valeurselectionnee);
    if (image !== "" && title !== "" && valeurselectionnee.value !== ""){
        addElementButton.style.backgroundColor = '#1D6154';
    }else {
        addElementButton.style.backgroundColor = '#A7A7A7';
    }
}

//ajouter un projet 
selectFormToAddProject.addEventListener("submit", async function(event){
    let image= document.getElementById("fileInput").files[0];
    let title= document.getElementById("title-input").value;
    let category= document.getElementById('category');    
    let valeurselectionnee = category.options[category.selectedIndex].id;

    let formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", valeurselectionnee);
    
    event.preventDefault;
    event.stopPropagation;

    const token =  "Bearer " + sessionStorage.getItem("token");
    const addWorkResponse = await fetch("http://localhost:5678/api/works", {
        method:"POST",
        headers:{"Authorization": token},
        body: formData
    }).catch(error => console.log(error));

    if (addWorkResponse.ok){
        alert("le projet a bien été ajouté à la galerie.")
        console.log("le projet a bien été ajouté à la galerie.")
    } else {
        alert("merci de bien vouloir renseigner les champs.")
    }
    document.location.href="index.html";
    
})


//Afficher le mode éditeur 
if (sessionStorage.getItem ("token")){
    document.querySelector(".connexion").textContent= "logout";
    document.querySelector(".js-modal").style.display=null;
    document.querySelector(".mode-editor").style.display=null;

    document.querySelector(".connexion").addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        document.location.href="index.html";
        document.querySelector(".connexion").textContent= "login";
        document.querySelector(".js-modal").style.display="none";
        document.querySelector(".mode-editor").style.display="none";
        sessionStorage.removeItem("token");
    })

};
