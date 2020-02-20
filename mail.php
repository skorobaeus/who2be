<?php
header("Access-Control-Allow-Origin: http://epic.spb.ru/");
    if (isset($_POST['name'])) {$name = $_POST['name'];}

$recepient = "mokatev@yandex.ru";
$sitename = "Тестовое письмецо";

$name = trim($_POST["name"]);
$mail = trim($_POST["mail"]);
$phone = trim($_POST["phone"]);
$front = trim($_POST["front"]);
$qa = trim($_POST["qa"]);
$mob = trim($_POST["mob"]);
$full = trim($_POST["full"]);


$message = " <strong>Имя студента</strong>: $name <br>
<strong>E-mail:</strong> $mail <br>
<strong>Номер телефона</strong> $phone <br>
<strong>Баллы Фронтенд:</strong> $front <br>
<strong>Баллы QA:</strong> $qa <br>
<strong>Баллы Мобильной разработки:</strong> $mob <br>
<strong>FullStack:</strong> $full <br>"



;
echo $message;

print_r($_POST);
$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>