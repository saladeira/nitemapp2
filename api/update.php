<?php
/*
Developer:  Ehtesham Mehmood
Site:       PHPCodify.com
Script:     Angularjs Login Script using PHP MySQL and Bootstrap
File:       login.php
*/

//include database connection file
require_once 'db_config.php';


// verifying user from database using PDO

//Run query

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    echo $request;

    $email = $request->user_email;
    $nome = $request->user_name;
    $nascimento = $request->user_nascimento;
    $imagem = $request->user_img;

    echo $request;

    $statement = $DBcon->prepare('UPDATE user SET user_name="'.$nome.'", user_nascimento='.$nascimento.', user_img='.$imagem.' WHERE user_email="'.$email.'"');

    try {
      $statement->execute();
      echo 'sucesso';
    } catch (PDOException $e) {
      echo $e->getCode();
    }

}


// $statement = $DBcon->prepare('INSERT INTO user (user_email,user_password) VALUES("'.$_POST['user_email'].'","'.$_POST['user_password'].'")');

?>
