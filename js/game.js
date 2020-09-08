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

    if (user.length > i)
        colorPregunta.classList.add(user[i].isCorrecta ? 'correctaRespuesta' : 'incorrectaRespuesta');

    summaryCuadro.appendChild(numeroPregunta);
    summaryCuadro.appendChild(colorPregunta);

    summary.appendChild(summaryCuadro);
}

modifyPage(numero);

function modifyPage(numero) {
    if (numero > quantity)
        return window.open('/', '_self');

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
    var respuestasSplice = JSON.parse(JSON.stringify(respuestas));

    //Div respuesta DOM
    let respuestaDOM = document.getElementById('respuestas');
    respuestaDOM.innerHTML = '';
    respuestaDOM.style.pointerEvents = 'all';

    let positionCorrect = 0;
    for (let i = 0; i < respuestas.length; i++) {
        let respuesta = respuestasSplice.splice(Math.floor(Math.random() * respuestasSplice.length), 1)[0];

        let divRespuesta = document.createElement('div');
        divRespuesta.classList.add('cuadro');
        divRespuesta.classList.add('hover');
        divRespuesta.innerHTML = respuesta;
        if (correcta == respuesta)
            positionCorrect = i;
        respuestaDOM.appendChild(divRespuesta);

        divRespuesta.addEventListener("click", function (e) {
            var respuestaClick = respuesta;
            if (respuestaClick === correcta) {
                e.target.classList.add("correctaRespuesta");
                summary.children[numero - 1].lastChild.classList.add("correctaRespuesta");
            } else {
                e.target.classList.add("incorrectaRespuesta");
                summary.children[numero - 1].lastChild.classList.add("incorrectaRespuesta");
                respuestaDOM.children[positionCorrect].classList.add("correctaRespuesta");
            }

            respuestaDOM.style.pointerEvents = 'none';

            user.push({ correcta: correcta.replace("\"", "\'"), respuestas: respuestas, click: respuestaClick.replace("\"", "\'"), pregunta: preguntas[numero - 1].question.replace("\"", "\'"), isCorrecta: respuestaClick === correcta });
            localStorage.setItem("numero", ++numero);
            localStorage.setItem("user", JSON.stringify(user));

            setTimeout(function () {
                modifyPage(numero);
            }, 2000);
        });
    }
}