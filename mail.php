<?php
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: Робот Теста на проф.ориентацию <noreply@user.ru>'. "\r\n";

    if (isset($_POST['name'])) {$name = $_POST['name'];}

$recepient = "mokatev@yandex.ru","a.zverev@netology.ru","solar.rust@gmail.com";
// $recepient = " a.avtonomova@netology.ru";

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
<strong>Баллы FullStack:</strong> $full <br>
это письмо отправлено автомтически, пожалуйста, не отвечайте на него";


print_r($_POST);
$pagetitle = "Результат теста на проф.ориентацию студента \"$name\"";
mail($recepient, $pagetitle, $message, $headers);
?>