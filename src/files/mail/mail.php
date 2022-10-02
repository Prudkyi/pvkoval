<?php
  if (isset($_POST))
  {
    require_once('phpmailer/PHPMailerAutoload.php');
    $mail = new PHPMailer;
    $mail->CharSet = 'utf-8';

    $nameUser = htmlspecialchars($_POST['Name']);
    $telUser = htmlspecialchars($_POST['Phone']);
    $emailUser = htmlspecialchars($_POST['Email']);
    $massageUser = htmlspecialchars($_POST['Massage']);
    $typeMess = $_POST['typeMess'];

    if ($nameUser == '' || $tellUser == '' || $massegeUser == ''){
        header("Location: http://pvkoval.com.ua/");
        exit( );
    }

    if ($typeMess == 'callback'){
        $themeMessage = "PVKoval Заявка";
        $message = "
        <h1>PVKoval Заявка</h1>
        <ul>
        <li><b>Ім'я: $nameUser</b></li>
        <li><b>Телефон: $telUser</b></li>
        <li><b>E-mail: $emailUser</b>/li>
        <li><b>Повідомлення: $massageUser</b></li>
        </ul>
        ";
    }
    else {
        $themeMessage = "PVKoval Контактна Форма";
                $message = "
                <h1>PVKoval Заявка</h1>
                <ul>
                <li><b>Ім'я: $nameUser</b></li>
                <li><b>Телефон: $telUser</b></li>
                <li><b>E-mail: $emailUser</b>/li>
                <li><b>Повідомлення: $massageUser</b></li>
                </ul>
                ";
    }

    $mail->isSMTP();
        $mail->Host = 'linework.com.ua';
        $mail->SMTPAuth = true;
        $mail->Username = 'work@linework.com.ua';
        $mail->Password = 'uj4DqX3g';
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom('linework.com.ua');
        $mail->addAddress('prudkyi87@gmail.com');
        $mail->isHTML(true);

    $mail->Subject = $themeMessage;
    $mail->Body    = $message;
    $mail->AltBody = '';

    if(!$mail->send()) {
       echo 'Error';
    } else {
        exit( );
    }


  }
?>