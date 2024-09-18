<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $to = "me@siadev.ru";
    $subject = "Новое сообщение от $name";
    $body = "Имя: $name\nEmail: $email\nСообщение: $message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Письмо отправлено!";
    } else {
        echo "Ошибка при отправке.";
    }
}
?>