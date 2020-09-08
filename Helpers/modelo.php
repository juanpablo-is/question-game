<?php

function getCategory()
{
    $url = file_get_contents("https://opentdb.com/api_category.php");
    $json = json_decode($url, true);

    return $json['trivia_categories'];
}
