const homePage = document.getElementById("homePage");

const timeLine = document.getElementById("timeLine")
const timelinePost = document.getElementById("timelinePost");
const timelinePostPerfil = document.getElementById("timelinePostPerfil");
let profile = document.getElementById("profile");
let alertForPostEmpty = document.getElementById("alertForPostEmpty");
let alertForPostEmptyProfile = document.getElementById("alertForPostEmptyProfile");
//inicialize of timeline part

let db = firebase.firestore()
db.collection("Users").orderBy("dates", "desc").where("status", "==", "Publico")
  .onSnapshot((mnsj) => {
	
    document.getElementById("sectionWithPost").innerHTML = "";

    mnsj.forEach((doc) => {
      if (doc.data().uid === uid) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        let postOfUser = doc.data();
        let publicChecked = postOfUser.status == "Publico" ? "checked" : "";
        let privateChecked = postOfUser.status == "Privado" ? "checked" : "";
        document.getElementById("sectionWithPost").innerHTML += `
						<section class="invisible" id = "${doc.id}inputEditPost">
							<input class= "post" id= "editPostInput" type="textArea" size = "30" value = "${postOfUser.message}"></input>
							<label><input type="radio" name="${doc.id}radioForStatus" value="Publico" ${publicChecked}>Público</label>
                			<label><input type="radio" name="${doc.id}radioForStatus" value="Privado" ${privateChecked}>Privado</label>
							<button class= "saveButton" id="${doc.id}" data-id="${doc.id}">Guardar</button>
							<button class= "cancel" id="${doc.id}" data-id="${doc.id}">Cancelar</button>
						</section>

						<section id="${doc.id}thisPost" class = "postInBox">
							<p>Fecha: ${postOfUser.dates}</p>
							<p>Nombre: ${postOfUser.name}</p>
							<p>Estado: ${postOfUser.message}</p>
							<button class="buttonEdit" id="${doc.id}buttoneditpost" data-id="${doc.id}">Editar</button>
							<button class="buttonDelete" id="${doc.id}buttonDelete">Eliminar</button>
						</section>
						<section id="${doc.id}buttonForLike">
				      <button > &#x1F49B;  </button>
			    	  <p>Me gusta ${postOfUser.likes}</p>
			      </section>`

        let newPost = document.getElementById("editPostInput").value;

      } else {
        console.log(doc.id, " => ", doc.data());

        let postOfUser = doc.data();
        document.getElementById("sectionWithPost").innerHTML += `
 						<section  class = "postInBox">
 						<p>Fecha: ${postOfUser.dates}</p>
						<p>Nombre: ${postOfUser.name}</p>
 						<p>Estado: ${postOfUser.message}</p>
            <section id="buttonForLike">
 				    <button id="${doc.id}" class="buttonLike"> &#x1F49B;</button>
 			    	<p>Me gusta ${postOfUser.likes}</p>
 						</section>

 			      </section>`

            let likeButtons = document.getElementsByClassName("buttonLike");
            for (let i = 0; i < likeButtons.length; i++) {
              likeButtons[i].addEventListener("click", sendLikes);
            };
      }
    });
    let buttons = document.getElementsByClassName("buttonDelete");
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", deleteButton);
        };

        let editButtons = document.getElementsByClassName("buttonEdit");
        for (let i = 0; i < editButtons.length; i++) {
          editButtons[i].addEventListener("click", () => {
          	let docId = editButtons[i].getAttribute("data-id");
            console.log("Di click");
            document.getElementById(`${docId}inputEditPost`).style.display = "block";
            document.getElementById(`${docId}thisPost`).style.display = "none";
            document.getElementById(`${docId}buttonForLike`).style.display = "none";
          });
        };

        	let cancel = document.getElementsByClassName("cancel");
    		for (let i = 0; i < cancel.length; i++) {
				cancel[i].addEventListener("click", () =>{
					let docId = cancel[i].getAttribute("data-id");
					console.log("Di click");
					document.getElementById(`${docId}inputEditPost`).style.display = "none";
					document.getElementById(`${docId}thisPost`).style.display = "block";
					document.getElementById(`${docId}buttonForLike`).style.display = "block";
				});
		  };

        let savebuttons = document.getElementsByClassName("saveButton");
        for (let i = 0; i < savebuttons.length; i++) {
          savebuttons[i].addEventListener("click", editPost);
        }
       let likeButtons = document.getElementsByClassName("buttonLike");
        for (let i = 0; i < likeButtons.length; i++) {
          likeButtons[i].addEventListener("click", sendLikes);
}
  });
//finalize of timeline part

//inicialize of profile part
let uid = localStorage.getItem("uid");
console.log(uid);

let dbUid = firebase.firestore()
dbUid.collection("Users").orderBy("dates","desc")
  .onSnapshot((mnsj) => {
    document.getElementById("sectionWithUidPost").innerHTML = "";

    mnsj.forEach((doc) => {
      if (doc.data().uid === uid) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());

        let postOfUserProfile = doc.data();
        let publicChecked = postOfUserProfile.status == "Publico" ? "checked" : "";
        let privateChecked = postOfUserProfile.status == "Privado" ? "checked" : "";
        console.log(postOfUserProfile.status);
        console.log(`${doc.id} public: ${publicChecked}, private: ${privateChecked}`);
        document.getElementById("sectionWithUidPost").innerHTML += `

			<section class="invisible" id="${doc.id}inputEditPostProfile">
				<input class= "post" id= "${doc.id}editPostInputProfile" type="textArea" size = "30" value = "${postOfUserProfile.message}"></input>
				<label><input type="radio" name="${doc.id}radioForStatusProfile" value="Publico" ${publicChecked}>Público</label>
                <label><input type="radio" name="${doc.id}radioForStatusProfile" value="Privado" ${privateChecked}>Privado</label>
				<button class= "saveButton" id="${doc.id}saveButton" data-id="${doc.id}">Guardar</button>
				<button class= "cancel" id="${doc.id}cancelButton" data-id="${doc.id}">Cancelar</button>
			</section>
			<section id="${doc.id}thisPostProfile" class = "postInBox">
				<p>Fecha: ${postOfUserProfile.dates}</p>
				<p>Nombre: ${postOfUserProfile.name}</p>
				<p>Estado: ${postOfUserProfile.message}</p>
				<button class="buttonEdit" id="${doc.id}buttonEdit" data-id="${doc.id}">Editar</button>
				<button class="buttonDelete" id="${doc.id}buttonDelete">Eliminar</button>
			</section>
			<section id="${doc.id}buttonForLikeProfile">
				<button > &#x1F49B;  </button>
				<p>Me gusta ${postOfUserProfile.likes}</p>
			</section>`
        let newPostProfile = document.getElementById(`${doc.id}editPostInputProfile`).value;

      };
    });

        let buttonsProfile = document.getElementsByClassName("buttonDelete");
        for (let i = 0; i < buttonsProfile.length; i++) {
          buttonsProfile[i].addEventListener("click", deleteButton);
        };

        let editButtonsProfile = document.getElementsByClassName("buttonEdit");
        for (let i = 0; i < editButtonsProfile.length; i++) {
          editButtonsProfile[i].addEventListener("click", () => {
          	let docId = editButtonsProfile[i].getAttribute("data-id");
            console.log("Di click");
            document.getElementById(`${docId}inputEditPostProfile`).style.display = "block";
            document.getElementById(`${docId}thisPostProfile`).style.display = "none";
            document.getElementById(`${docId}buttonForLikeProfile`).style.display = "none";
          });
        };


        let cancelProfile = document.getElementsByClassName("cancel");
    		for (let i = 0; i < cancelProfile.length; i++) {
				cancelProfile[i].addEventListener("click", () =>{
						let docId = cancelProfile[i].getAttribute("data-id");
						console.log("Di click");
						document.getElementById(`${docId}inputEditPostProfile`).style.display = "none";
						document.getElementById(`${docId}thisPostProfile`).style.display = "block";
						document.getElementById(`${docId}buttonForLikeProfile`).style.display = "block";
					});
			  };

        let savebuttonsProfile = document.getElementsByClassName("saveButton");
        for (let i = 0; i < savebuttonsProfile.length; i++) {
          savebuttonsProfile[i].addEventListener("click", editPost);
        }
        let likeButtons = document.getElementsByClassName("buttonLike");
        for (let i = 0; i < likeButtons.length; i++) {
          likeButtons[i].addEventListener("click", sendLikes);
          };

  });
//finalize of profile part

const deleteButton = (event) => {
  // messageToDelete =
  let idOfPost = event.target.id;
  if(confirm("¿Estás seguro que deseas eliminar esta publicación?")) {
  	window.data.deleteFunction(idOfPost);
  }
};


const editPost = (event) => {

  let idOfPost = event.target.getAttribute("data-id");
  let status = document.querySelector(`[name=${idOfPost}radioForStatusProfile]:checked`).value;
		console.log(postOfUser);
    let newPost = document.getElementById("editPostInput").value;
  // messageToDelete =
  window.data.editFunction(idOfPost, newStatus, newPost);
};


const signOutButton = () => {
  console.log("in: button.js signOutButton");
  window.data.signOutFunction();
  location.assign("index.html");
};

const createPostFunction = (docRef) => {
  console.log("in: button.js createPostFunction");
  // let name = profile.value;
  // console.log(name);
  let status = document.querySelector("[type=radio]:checked").value;
  let message = timelinePost.value;
  let day = new Date().toLocaleDateString();
  let hour = new Date().toLocaleTimeString();
  let dates = " ";
  dates = day + " " + hour;
  console.log(dates);
  let saveResultOfFunction = window.data.createPost(message, status, dates);
  
  if (saveResultOfFunction != "") {
  	alertForPostEmpty.innerHTML = "Escribe un mensaje para empezar a publicar."
  }
  timelinePost.value= "";
};

const createPostFunctionProfile = (docRef) => {
  console.log("in: button.js createPostFunction");
  // let name = profile.value;
  // console.log(name);
  let status = document.querySelector("[type=radio]:checked").value;
  let message = timelinePostPerfil.value;
  let day = new Date().toLocaleDateString();
  let hour = new Date().toLocaleTimeString();
  let dates = " ";
  dates = day + " " + hour;
  console.log(dates);
  let saveResultOfFunction = window.data.createPost(message, status, dates);
  timelinePostPerfil.value= "";
  if (saveResultOfFunction != "") {
  	alertForPostEmptyProfile.innerHTML = "Escribe un mensaje para empezar a publicar."
  }
};

/*const editPost = (event) => {
  let idOfPost = event.target.id;

  // messageToDelete =
  window.data.editFunction(idOfPost);
};*/

const sendLikes = (event) => {
console.log(event.target.id);
    let idOfPost = event.target.id;
  window.data.likesFunction(idOfPost);
};

const goToProfilePage = () => {
  homePage.style.display = "none";
  timeLine.style.display = "block";
};

const goToHomePage = () => {
  homePage.style.display = "block";
  timeLine.style.display = "none";
}

const security = firebase.auth().onAuthStateChanged(function(user) {
	if (user && user.emailVerified) {
		console.log("hello");
	}
	else {
		// User is signed out.
		console.log("usuario desconectado");
		location.assign("index.html");	
	};
});

document.getElementById("signOut").addEventListener("click", signOutButton);
document.getElementById("buttonForCreatePost").addEventListener("click", createPostFunction);
document.getElementById("buttonForCreatePostPerfil").addEventListener("click", createPostFunctionProfile);
document.getElementById("goProfilePage").addEventListener("click", goToProfilePage);
document.getElementById("goHomePage").addEventListener("click", goToHomePage);
