<?php

if (!isset($_GET['position'])) {
    header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title">Review</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <script type="text/javascript">
        var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            window.open("index.php", "_self");
        }
    </script>
</head>

<body>
    <header id="header">
        <h2>Question Game</h2>
    </header>

    <main id="mainGame">

        <div class="left">
            <img src="images/left-icon.png" />
        </div>
        <div class="centro">
            <div id="display">
                <div class="pregunta">
                    <h2 id="preguntaTexto"></h2>
                </div>
            </div>

            <div id="respuestas">
                <div class="cuadro hover"></div>
                <div class="cuadro hover"></div>
                <div class="cuadro hover"></div>
                <div class="cuadro hover"></div>
            </div>
        </div>
        <div class="right">
            <img src="images/right-icon.png" />
        </div>
    </main>
    <script src="js/review.js" type="text/javascript"></script>
</body>

</html>