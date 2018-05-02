<?php
 require('db_config.php');



if($_POST['fromSignup']) {

  try {
    $userid = $_POST[('email-cadastro')];
    if ($_POST[('senha-cadastro-2')]) {
      $pass1 = $_POST[('senha-cadastro-2')];
    } else {
      $digits = 8;
      $pass1 = rand(pow(10, $digits-1), pow(10, $digits)-1);
    }
    $fbReg = $_POST[('fbRegister')];

    $salt = rand();
    $password_hash = crypt($pass1, $salt);
    $sql= "INSERT INTO user (email, senha, salt, fbRegister) VALUES (?, ?, ?, ?)";
    $result = $DBcon->prepare($sql);
    $count = $result->execute(array($userid, $password_hash, $salt, $fbReg));

    $last_id = $DBcon->lastInsertId();

    echo $last_id;


  } catch(PDOException $e) {
    echo $e->getMessage();
  }

  // try {
  //
  //   $sql = $DBcon->prepare("INSERT INTO user (email, senha) VALUES ('".$_POST[trim('email_signup')]."', '".$_POST[trim('senha_signup')]."')");
  //
  //   // use exec() because no results are returned
  //   $sql->execute();
  //   echo "New record created successfully";
  // } catch(PDOException $e) {
  //   echo $e->getMessage();
  // }

}

$DBcon = null;

?>
