<?php

 require('db_config.php');

 if($_GET['fromLogin'] || $_GET['fromSignup']) {

    $user_email = trim($_GET['email']);

    try {
      $sql = $DBcon->prepare('SELECT email, fbRegister, id FROM user WHERE email = ?');
      $sql->execute(array($user_email));

      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $count = $sql->rowCount();

      if ($count == 0) {
        echo 'false';
      }

      if ($count == 1) {
        echo 'true';
      }

      //echo $count;
      //print $count;
    } catch(PDOException $e) {
      echo $e->getMessage();
    }

 }

$DBcon = null;

?>
