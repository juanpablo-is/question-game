var user = JSON.parse(localStorage.getItem("user"));
var userLength = user.length;
const position = new URLSearchParams(window.location.search).get("position");
user = user[position - 1];

if (position <= userLength && position != 0) {
    document.getElementById("title").innerHTML = "Review #" + position;
    document.getElementById("preguntaTexto").innerHTML = user.pregunta;

    var left = document.getElementsByClassName("left")[0];
    left.addEventListener("click", previous, true);

    var right = document.getElementsByClassName("right")[0];
    right.addEventListener("click", next, true);

    if (position == 1) {
        left.style.visibility = "hidden";
    }

    var respuestasHTML = document.getElementsByClassName("cuadro");
    var correcta = user.correcta;
    var click = user.click;
    var respuestas = user.respuestas;
    var respuestasHabiles = [];

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
        respuestasHTML[i].classList.remove("hover");

        if (respuestasHabiles[i] == click) {
            if (click != correcta) {
                respuestasHTML[i].classList.add("incorrectaRespuesta");
            }
        }
        if (respuestasHabiles[i] == correcta) {
            respuestasHTML[i].classList.add("correctaRespuesta");
        }
    }

} else {
    window.open("results.php", "_self");
}



function next() {
    if (position == userLength) {
        window.open("results.php", "_self");
    } else {
        window.open("review.php?position=" + (parseInt(position) + 1), "_self");
    }
}

function previous() {
    window.open("review.php?position=" + (parseInt(position) - 1), "_self");
}