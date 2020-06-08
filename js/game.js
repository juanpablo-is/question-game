//Número del contador de la pregunta
var numero = parseInt(localStorage.getItem("numero"));
//Número total de preguntas en el juego
var quantity = parseInt(localStorage.getItem("quantity"));
//Objeto de las preguntas del usuario
var user = JSON.parse(localStorage.getItem("user"));
//Objeto de las preguntas del juego
var preguntas = JSON.parse(localStorage.getItem("preguntas"));
//DOM para las respuestas
var respuestasHTML = document.getElementsByClassName("cuadro");

//Crea una grilla de acuerdo a las preguntas
var summary = document.getElementById("summary");
summary.style.gridTemplateColumns = "repeat(" + quantity + ", 1fr)";
for (let i = 0; i < quantity; i++) {
    var summaryCuadro = document.createElement("div");
    summaryCuadro.className = "summaryCuadro";

    var numeroPregunta = document.createElement("div");
    numeroPregunta.className = "numeroPregunta";
    numeroPregunta.innerHTML = (i + 1);

    var colorPregunta = document.createElement("div");
    colorPregunta.className = "colorPregunta";

    summaryCuadro.appendChild(numeroPregunta);
    summaryCuadro.appendChild(colorPregunta);

    summary.appendChild(summaryCuadro);
}

modificarPage(numero);

/*
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

    }
};
xhttp.open("GET", "ajax_info.txt", true);
xhttp.send();
*/



function modificarPage(numero) {
    if (numero > quantity) {
        return 0;
    }
    console.log(numero);
    //Modifica el título de la página y el título a la pregunta
    document.getElementById("title").innerHTML = "Question #" + numero;
    document.getElementById("preguntaTexto").innerHTML = preguntas[numero - 1].question;

    //Agrega una clase al cuadro en la grilla de acuerdo a su posición (Verde o Rojo)
    // document.getElementsByClassName('colorPregunta')[numero - 1].classList.add((numero < user.length) ? (user[numero - 1].correcta == user[numero - 1].click) ? "correctaRespuesta" : "incorrectaRespuesta" : ".");

    //Respuesta correcta de las preguntas de API
    var correcta = preguntas[numero - 1]['correct_answer'];
    //Respuestas incorrectas de las preguntas de API
    var respuestas = preguntas[numero - 1]['incorrect_answers'];
    respuestas.push(correcta);

    //Debido a que se elimina del array 'splice' se guarda el tamaño en la variables
    let totalRespuestas = respuestas.length;
    for (let i = 0; i < totalRespuestas; i++) {
        let respuesta = respuestas.splice(Math.floor(Math.random() * respuestas.length), 1);
        console.log("Respuesta: "+respuesta);
        respuestasHTML[i].innerHTML = respuesta;
        respuestasHTML[i].style.visibility = "visible";
        respuestasHTML[i].addEventListener("click", function (e) {
            var respuestaClick = e.target.innerHTML;

            let respuestasHabiles = preguntas[numero - 1]['incorrect_answers'];
            respuestasHabiles.push(preguntas[numero - 1]['correct_answer']);

            user.push({ correcta: correcta.replace("\"", "\'"), respuestas: respuestasHabiles, "click": respuestaClick.replace("\"", "\'"), pregunta: preguntas[numero - 1].question.replace("\"", "\'") });

            if (respuestaClick === correcta) {
                e.target.classList.add("correctaRespuesta");
                summary.children[numero - 1].lastChild.classList.add("correctaRespuesta");
            } else {
                e.target.classList.add("incorrectaRespuesta");
                summary.children[numero - 1].lastChild.classList.add("incorrectaRespuesta");
                e.target.classList.add("correctaRespuesta");
            }

            respuestasHTML[0].removeEventListener("click", eventoRespuesta, false);
            respuestasHTML[1].removeEventListener("click", eventoRespuesta, false);

            if (respuestas.length === 4) {
                respuestasHTML[2].removeEventListener("click", eventoRespuesta, false);
                respuestasHTML[3].removeEventListener("click", eventoRespuesta, false);
            }

            localStorage.setItem("numero", numero + 1);
            localStorage.setItem("user", JSON.stringify(user));

            console.log("fin", numero);
            setTimeout(function () {
                modificarPage(++numero);
            }, 2000);
        }, false);
    }
}

function eventoRespuesta(e, i) {

}