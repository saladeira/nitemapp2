<?php

require('db_config.php');

if($_POST['fromLogin'])
{
  $user_email = trim($_POST['email']);
  $user_password = trim($_POST['senha']);

  $sql = $DBcon->prepare('SELECT id, senha, salt, new FROM user WHERE email = ?');
  $sql->execute(array($user_email));
  list($id, $existing_hash, $salt, $new) = $sql->fetch(PDO::FETCH_NUM);
  unset($sql);


  $new_hash = crypt($user_password, $salt);

  if($new_hash === $existing_hash) {
    echo json_encode(array('login' => true, 'id' => $id, 'new' => $new));
  } else {
    echo json_encode(array('login' => false, 'id' => null));
  }
}

$DBcon = null;

?>
