<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers: Content-Type');

 session_start();

 require('db_config.php');

 if(!empty($_POST['email']))
 {
  $user_email = trim($_POST['email']);
  $user_password = trim($_POST['senha']);

  //$password = md5($user_password);

  try
  {

   $stmt = $DBcon->prepare("SELECT * FROM user WHERE email=:email");
   $stmt->execute(array(":email"=>$user_email));
   $row = $stmt->fetch(PDO::FETCH_ASSOC);
   $count = $stmt->rowCount();

   if($row['senha']==$user_password){

    echo $row['id']; // log in
    $_SESSION['user_session'] = $row['id'];
   }
   else{

    echo "email or password does not exist."; // wrong details
   }

  }
  catch(PDOException $e){
   echo $e->getMessage();
  }
 }

?>
