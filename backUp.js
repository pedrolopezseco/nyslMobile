function mostrarPaginas(pagina) {
    var pages = document.querySelectorAll("#info,#about,#contact,#home");
    pages.forEach(p => p.classList = "d-none");

    var page = document.getElementById(pagina);
    page.classList = "d-block";
}

function partidos(){
    var partidosId = document.querySelectorAll("#partido1,#partido2,#partido3,#partido4,#partido5,#partido6,#partido7,#partido8,#partido9,#partido10,#partido11,#partido12,#partido13,#partido14,#partido15,#partido16,#partido17");
    if(document.getElementById('partidosId').onclick != null) {
        
    }
}

var app = new Vue({
    el: '#app',
    data: {
        mensaje: '',
        mensajes: {
            partido1:{},
            partido2:{},
            partido3:{},
            partido4:{},
            partido5:{},
            partido6:{},
            partido7:{},
            partido8:{},
            partido9:{},
            partido10:{},
            partido11:{},
            partido12:{},
            partido13:{},
            partido14:{},
            partido15:{},
            partido16:{},
            partido17:{},
        },
        userEmail: '',
        userPassword: '',
    },
    methods: {
        send: function () {
            var postData = {
                texto: app.mensaje,
                email: firebase.auth().currentUser.email
            };
            var updates = {
                //"mesajes/1": postData
            };
            updates['/mensajes/' + this.mensajes.length] = postData;

            firebase.database().ref().update(updates).then(function (result) {
                console.log("mensaje enviado")
            });

            firebase.database().ref('/mensajes/').on('child_added', function (data) {
                app.mensajes.push(data.val())
            })
        },
        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        },
        register: function () {
            firebase.auth().createUserWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta creada");
                })
                .catch(function (error) {
                    console.log("error papa" + error)
                })
        },
        loginEmail: function () {
            firebase.auth().signInWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta logueada");
                })
                .catch(function (error) {
                    console.log("error de login" + error)
                })
        }
    }
})




/*if(pagina == 'about') {
        document.getElementById("tituloMenu").innerHTML = "About NYSL";
        document.getElementById("primerElemento").innerHTML = "
    }else if(pagina == 'info') {
        document.getElementById("tituloMenu").innerHTML = "Game info";
    }else if(pagina == 'contact') {
        document.getElementById("tituloMenu").innerHTML = "Contact";
    }else {
        document.getElementById("tituloMenu").innerHTML = "Home";
                
var mensajesPorPartido = document.querySelectorAll("#partido1,#partido2,#partido3,#partido4,#partido5,#partido6,#partido7,#partido8,#partido9,#partido10,#partido11,#partido12,#partido13,#partido14,#partido15,#partido16,#partido17");
            mensajesPorPartido.forEach()
            
            
firebase.database().ref('/mensajes/partido1').on('child_added',function(data){
    app.mensajes.partido1.push(data.val()) 
});
    }*/
