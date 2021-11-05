<?php
//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');
$POST = file_get_contents('php://input');
$mailbody = json_decode($POST, true);
print_r($mailbody);
//Create a new PHPMailer instance
$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';
//Set who the message is to be sent from
$mail->setFrom('admin@gsk108.ru', 'Регистрация на сайте ГСК108');
//Set an alternative reply-to address
$mail->addReplyTo('admin@gsk108.ru', 'ГСК108');
//Set who the message is to be sent to
$mail->addAddress('uraskpravo@gmail.com', 'Aseev');
$mail->addAddress('venderu@gmail.com', 'vender');
//Set the subject line
$mail->Subject = 'Регистрация на сайте ГСК108';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
// $mail->msgHTML($mailbody, __DIR__);
$mail->isHTML(false);
$mail->Body = <<<EOT
Email: {$mailbody['email']}
Имя: {$mailbody['fio']}
EOT;
//Replace the plain text body with one created manually
// $mail->AltBody = $mailbody;
//Attach an image file
// $mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent!';
}