<?php
require_once 'modelo.php';
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Question Game</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
    <div id="contenido">
        <header id="header">
            <h2>Question Game</h2>
        </header>

        <main id="main">
            <form action="startGame.php" method="POST">
                <label for="quantity">Select Quantity</label>
                <input type="number" id="quantity" name="quantity" min="5" max="20" value="5">

                <label for="categories">Select Category</label>
                <select id="categories" name="category">
                    <option value="any">Any</option>
                    <?php
                    $categories = getCategory();
                    for ($i = 0; $i < count($categories); $i++) :
                    ?>
                        <option value="<?= $categories[$i]['id'] ?>"><?= $categories[$i]['name'] ?></option>
                    <?php endfor; ?>
                </select>

                <label for="mode">Select Mode</label>
                <select id="mode" name="mode">
                    <option value="any">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label for="type">Select Type</label>
                <select id="type" name="type">
                    <option value="any">Any</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
                <input type="submit" value="START">
            </form>
        </main>
    </div>
</body>

</html>