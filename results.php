<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="css/styles.css">
    <title>Results</title>

    <script type="text/javascript">
        var user = JSON.parse(localStorage.getItem("user"));
        if (user == null) {
            window.open("/index.php", "_self");
        }
    </script>
</head>

<body>
    <header id="header">
        <h2>Question Game</h2>
    </header>

    <main id="main">
        <div id="table">
            <table style="width:100%">
                <tr>
                    <th class="question">Question</th>
                    <th>Your Answer</th>
                    <th>Correct Answer</th>
                </tr>
            </table>
        </div>

        <h2 id="btnRepetir">AGAIN</h2>
    </main>

    <script type="text/javascript" src="js/results.js"></script>
</body>

</html>