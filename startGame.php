<?php

if (isset($_POST)) {

    $amount = $_POST['quantity'];
    $category = $_POST['category'];
    $difficulty = $_POST['mode'];
    $type = $_POST['type'];


    $urlGame = "https://opentdb.com/api.php?amount=" . $amount .
        (($category === "any") ? "" : "&category=" . $category) .
        (($difficulty === "any") ? "" : "&difficulty=" . $difficulty) .
        (($type === "any") ? "" : "&type=" . $type);

    $url = file_get_contents($urlGame);
    $json = json_decode($url, true);
}

?>
<script type='text/javascript'>
    var sesion = <?php echo json_encode($json); ?>;
    var quantity = <?php echo json_encode($amount); ?>;
    var data = [];

    localStorage.setItem("preguntas", JSON.stringify(sesion['results']));
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("numero", 1);
    localStorage.setItem("user", JSON.stringify(data));

    window.open("/gaming.php", "_self");
</script>