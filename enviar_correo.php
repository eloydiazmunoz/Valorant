<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluye la clase PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Crea una nueva instancia de PHPMailer
$mail = new PHPMailer();

// Configura el servidor SMTP de Mailtrap
$mail->isSMTP();
$mail->Host = 'smtp.mailtrap.io';
$mail->SMTPAuth = true;
$mail->Username = 'd96aaad0068eaf';
$mail->Password = '3e1c279e35a87e';
$mail->Port = 2525; // Puerto para Mailtrap

// Configura los destinatarios
$destinatarios = array(
    'juanjo.conejo.lgit@gmail.com' => 'Juanjo Conejo',
    'kevinmelerlsgi@gmail.com' => 'Kevin Meler',
    'eloydiazlsgi@gmail.com' => 'Eloy Díaz'
);

foreach ($destinatarios as $correo => $nombre) {
    $mail->addAddress($correo, $nombre);
}

// Obtiene los datos del formulario
$nombre = $_POST['name'];
$correo = $_POST['email'];
$mensaje = $_POST['message'];

// Configura el remitente
$mail->setFrom($correo, $nombre);

// Configura el contenido del correo
$mail->Subject = 'Mensaje de contacto desde el formulario';
$mail->Body    = "Nombre: $nombre\nCorreo electrónico: $correo\nMensaje: $mensaje";

// Envía el correo electrónico
if(!$mail->send()) {
    echo 'El mensaje no pudo ser enviado.';
    echo 'Error de envío: ' . $mail->ErrorInfo;
} else {
    echo 'Mensaje enviado correctamente.';
}

?>
