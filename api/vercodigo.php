<?php

require('db_config.php');

if($_POST['fromNovaSenha'])
{
  $user_email = trim($_POST['email-novasenha']);
  $user_code = trim($_POST['codigo-novasenha']);

  $sql = $DBcon->prepare('SELECT temppass FROM user WHERE email = ?');
  $sql->execute(array($user_email));
  list($temppass) = $sql->fetch(PDO::FETCH_NUM);
  unset($sql);

  if($temppass === $user_code) {
    echo json_encode(array('trocar' => true));
  } else {
    echo json_encode(array('trocar' => false));
  }
}

$DBcon = null;

?>
