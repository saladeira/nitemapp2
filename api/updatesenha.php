<?php

require('db_config.php');

if($_POST['fromTrocar']) {

  try {
    $userid = $_POST[('storagemail')];
    $senha = $_POST[('senha-trocar-2')];
    $salt = rand();
    $password_hash = crypt($senha, $salt);
    $digits = 20;
    $tempPass = rand(pow(10, $digits-1), pow(10, $digits)-1);

    $sql= "UPDATE user SET salt=?, senha=?, temppass=? WHERE email=?";
    $result = $DBcon->prepare($sql);
    $count = $result->execute(array($salt, $password_hash, $tempPass, $userid));

    if($result) {
      echo 'ok';
    } else {
      echo 'not';
    };


  } catch(PDOException $e) {
    echo $e->getMessage();
  };

}

if($_POST['fromTermos']) {

  try {
    $userid = $_POST[('userid')];

    $sql= "UPDATE user SET new='nao' WHERE id=?";
    $result = $DBcon->prepare($sql);
    $count = $result->execute(array($userid));

    if($result) {
      echo 'ok';
    } else {
      echo 'not';
    };


  } catch(PDOException $e) {
    echo $e->getMessage();
  };

}

$DBcon = null;

?>
