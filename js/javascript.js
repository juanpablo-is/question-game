//Número del contador de la pregunta
var numero = parseInt(localStorage.getItem("numero"));
//Número total de preguntas en el juego
var quantity = parseInt(localStorage.getItem("quantity"));

if (numero <= quantity) {
    //Objeto de las preguntas del usuario
    var user = JSON.parse(localStorage.getItem("user"));
    //Objeto de las preguntas del juego
    var preguntas = JSON.parse(localStorage.getItem("preguntas"));

    document.getElementById("title").innerHTML = "Question #" + numero;
    document.getElementById("preguntaTexto").innerHTML = preguntas[numero - 1].question;

    var summary = document.getElementsByClassName("summary")[0];
    summary.style.gridTemplateColumns = "repeat(" + quantity + ", 1fr)";

    //Crea el cuadro del resultado de respuestas (Verde o Rojo)
    for (let i = 0; i < quantity; i++) {

        var summaryCuadro = document.createElement("div");
        summaryCuadro.className = "summaryCuadro";

        var numeroPregunta = document.createElement("div");
        numeroPregunta.className = "numeroPregunta";
        numeroPregunta.innerHTML = (i + 1);

        var colorPregunta = document.createElement("div");
        colorPregunta.className = "colorPregunta";
        colorPregunta.classList.add((i >= user.length) ? "s" : (user[i].correcta == user[i].click) ? "correctaRespuesta" : "incorrectaRespuesta");

        summaryCuadro.appendChild(numeroPregunta);
        summaryCuadro.appendChild(colorPregunta);

        summary.appendChild(summaryCuadro);
    }

    var posicionCorrecta = 0;
    var respuestasHTML = document.getElementsByClassName("cuadro");
    var correcta = preguntas[numero - 1]['correct_answer'];
    var respuestas = preguntas[numero - 1]['incorrect_answers'];
    var respuestasHabiles = [];
    respuestas.push(correcta);

    if (respuestas.length == 4) {
        respuestasHabiles.splice(Math.floor(Math.random() * 4), 0, respuestas[0]);
        respuestasHabiles.splice(Math.floor(Math.random() * 4), 0, respuestas[1]);
        respuestasHabiles.splice(Math.floor(Math.random() * 4), 0, respuestas[2]);
        respuestasHabiles.splice(Math.floor(Math.random() * 4), 0, respuestas[3]);
    } else {
        respuestasHabiles.splice(Math.floor(Math.random() * 2), 0, respuestas[0]);
        respuestasHabiles.splice(Math.floor(Math.random() * 2), 0, respuestas[1]);
        respuestasHTML[2].style.visibility = "hidden";
        respuestasHTML[3].style.visibility = "hidden";
    }

    for (let i = 0; i < respuestasHabiles.length; i++) {
        respuestasHTML[i].innerHTML = respuestasHabiles[i];
        if (respuestasHabiles[i] === correcta) {
            posicionCorrecta = i;
        }
        respuestasHTML[i].addEventListener("click", eventoRespuesta, true);
    }
} else {
    window.open("/index.php", "_self");
}

function eventoRespuesta(e) {
    var respuestaClick = e.target.innerHTML;
    user.push({ correcta: correcta.replace("\"", "\'"), respuestas: respuestasHabiles, "click": respuestaClick.replace("\"", "\'"), pregunta: preguntas[numero - 1].question.replace("\"", "\'") });

    if (respuestaClick === correcta) {
        e.target.classList.add("correctaRespuesta");
        summary.children[numero - 1].lastChild.classList.add("correctaRespuesta");
    } else {
        e.target.classList.add("incorrectaRespuesta");
        summary.children[numero - 1].lastChild.classList.add("incorrectaRespuesta");
        respuestasHTML[posicionCorrecta].classList.add("correctaRespuesta");
    }

    respuestasHTML[0].classList.remove("hover");
    respuestasHTML[1].classList.remove("hover");
    respuestasHTML[0].removeEventListener("click", eventoRespuesta, true);
    respuestasHTML[1].removeEventListener("click", eventoRespuesta, true);

    if (respuestas.length == 4) {
        respuestasHTML[2].classList.remove("hover");
        respuestasHTML[3].classList.remove("hover");
        respuestasHTML[2].removeEventListener("click", eventoRespuesta, true);
        respuestasHTML[3].removeEventListener("click", eventoRespuesta, true);
    }

    localStorage.setItem("numero", numero + 1);
    localStorage.setItem("user", JSON.stringify(user));

    if (numero == quantity) {
        setTimeout(function () {
            window.open("/results.php", "_self");
        }, 2000);
    } else {
        setTimeout(function () {
            window.open("/gaming.php", "_self");
        }, 2000);
    }
}

