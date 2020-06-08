var user = JSON.parse(localStorage.getItem("user"));

if (user == null) {
    window.open("/index.php", "_self");
} else {
    var tabla = document.getElementById("table");

    for (let i = 0; i < user.length; i++) {

        var tr = document.createElement("tr");
        tr.className = ((user[i].click != user[i].correcta)) ? "incorrectaFila" : "correctaFila";

        var tdQuestion = document.createElement("td");
        tdQuestion.innerHTML = user[i].pregunta;
        tdQuestion.className = "question";

        var tdYour = document.createElement("td");
        tdYour.innerHTML = user[i].click;

        var tdCorrect = document.createElement("td");
        tdCorrect.innerHTML = user[i].correcta;

        tr.appendChild(tdQuestion);
        tr.appendChild(tdYour);
        tr.appendChild(tdCorrect);

        tr.addEventListener("click", function () {
            window.open("review.php?position=" + (i + 1), "_self");
        }, true);

        table.appendChild(tr);
    }

    var btnRepetir = document.getElementById("btnRepetir");
    btnRepetir.addEventListener("click", function () {
        localStorage.clear();
        window.open("/index.php", "_self");
    }, true);
}