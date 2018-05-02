<?php

require('db_config.php');

if($_POST['fromNovaSenha']) {

  try {
    $userid = $_POST[('email-novasenha')];
    $digits = 6;
    $tempPass = rand(pow(10, $digits-1), pow(10, $digits)-1);

    $sql= "UPDATE user SET temppass=? WHERE email=?";
    $result = $DBcon->prepare($sql);
    $count = $result->execute(array($tempPass, $userid));

    if($result) {
      $to      = $userid;
      $subject = 'Nitemapp - Nova senha';
      $message = "Use o número " . $tempPass . " para alterar a sua senha.";
      $headers = "From: Nitemapp\r\n";
      $headers .= "Reply-To: no-reply\r\n";
      $headers .= "MIME-Version: 1.0\r\n";
      $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

      mail($to, $subject, $message, $headers);
      
    } else {
      echo 'not';
    };


  } catch(PDOException $e) {
    echo $e->getMessage();
  };

}

$DBcon = null;

?>
