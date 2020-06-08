<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="title">Question #</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

    <script type="text/javascript">
        var numero = parseInt(localStorage.getItem("numero"));
        var quantity = parseInt(localStorage.getItem("quantity"));
        var user = JSON.parse(localStorage.getItem("user"));

        if (isNaN(numero) || isNaN(quantity) || user == null) {
            window.open("/index.php", "_self");
        }
    </script>
</head>

<body>
    <header id="header">
        <h2>Question Game</h2>
    </header>

    <main id="mainGame">

        <div class="centro">
            <div id="display">
                <div id="summary">
                </div>
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
    </main>
    <script type="text/javascript" src="js/game.js"></script>
</body>

</html>