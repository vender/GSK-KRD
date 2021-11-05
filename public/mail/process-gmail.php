<?php
header("Access-Control-Allow-Origin: *");
//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');
$POST = file_get_contents('php://input');
$mailbody = json_decode($POST, true);
print_r($mailbody);
//Create a new PHPMailer instance
$mail = new PHPMailer();
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
//SMTP::DEBUG_OFF = off (for production use)
//SMTP::DEBUG_CLIENT = client messages
//SMTP::DEBUG_SERVER = client and server messages
$mail->SMTPDebug = SMTP::DEBUG_SERVER;
$mail->CharSet = 'UTF-8';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 465;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = 'gsk108.krd@gmail.com';
//Password to use for SMTP authentication
$mail->Password = 'bcbgxvbryftadmsu';
//Set who the message is to be sent from
$mail->setFrom('gsk108.krd@gmail.com', 'Регистрация на сайте ГСК108');
//Set an alternative reply-to address
$mail->addReplyTo('gsk108.krd@gmail.com', 'ГСК108');
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