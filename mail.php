<?php
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    if (isset($_POST['name'])) {$name = $_POST['name'];}

$recepient = "mokatev@yandex.ru";
$sitename = "Тест на профориентацию";

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
$pagetitle = "Тестовое письмо \"$sitename\"";
mail($recepient, $pagetitle, $message, $headers);
?>