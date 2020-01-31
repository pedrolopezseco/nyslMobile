function mostrarPaginas(pagina) {
    var pages = document.querySelectorAll("#info,#about,#contact,#home");
    pages.forEach(p => p.classList = "d-none");

    var page = document.getElementById(pagina);
    page.classList = "d-block";
}

var app = new Vue({
    el: '#app',
    data: {
        mensaje: '',
        mensajes: [],
        userEmail: '',
        userPassword: '',
        partido: '',
        partidosSeptiembre: dataPartidos.partidos[0].septiembre,
        partidosOctubre: dataPartidos.partidos[0].octubre,
        conectado: false,
    },
    methods: {
        send: function (partidoId) {
            var postData = {
                texto: app.mensaje,         //guarda el mensaje y el email de quien lo manda
                email: firebase.auth().currentUser.email,
            };
            //se manda el mensaje a la base de datos
            firebase.database().ref('/mensajes/' + partidoId).push(postData).then(function (result) {
                console.log("mensaje enviado") 
            });
            this.mensaje = "";  //para vaciar el input cuando se manda un msj
        },
        mostrarChat: function(partidoId) {   //se muestran los mensajes de la base de datos dependiendo el partido
            app.mensajes = [];
            app.partido = partidoId;
            firebase.database().ref('/mensajes/' + partidoId).on('child_added', function (data) {
                app.mensajes.push(data.val())
            });
        },
        login: function () { 
            var provider = new firebase.auth.GoogleAuthProvider();   //login con google
            firebase.auth().signInWithPopup(provider);
        },
        register: function () {                                 //registro con email  
            firebase.auth().createUserWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta creada");
                })
                .catch(function (error) {
                    console.log("error papa" + error)
                })
        },
        loginEmail: function () {               //login con email
            firebase.auth().signInWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta logueada");
                })
                .catch(function (error) {
                    console.log("error de login" + error)
                })
        },
    }
})


firebase.auth().onAuthStateChanged(onAuthStateChanged);             //verifica si estas logueado o no

    function onAuthStateChanged(user) {
    // We ignore token refresh events. 
    if (user) {
        app.conectado = true;
    } else {
        app.conectado = false;
    }
}

