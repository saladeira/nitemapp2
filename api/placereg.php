<?php

 require('db_config.php');

 if($_POST['userID']) {

   if ($_POST['fbID'] == '') {
     $fbID = mt_rand(8,60);
   } else {
     $fbID = $_POST['fbID'];
   }

   $novoNome = $_POST['novoNome'];
   $novoLat = $_POST['novoLat'];
   $novoLng = $_POST['novoLng'];
   $novoRegistrado = $_POST['novoRegistrado'];
   $userID = $_POST['userID'];
   $novoDesc = $_POST['novoDesc'];
   $novoEnd = $_POST['novoEnd'];
   $novoAberto = $_POST['novoAberto'];
   $novoPublico = $_POST['novoPublico'];

   try {
     $sql= "INSERT INTO places (fb_id, place_lat, place_lng, place_nome, place_ende, place_descri, place_aberto, place_publico, place_registrado, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
     $result = $DBcon->prepare($sql);
     $count = $result->execute(array($fbID, $novoLat, $novoLng, $novoNome, $novoEnd, $novoDesc, $novoAberto, $novoPublico, $novoRegistrado, $userID));
   } catch(PDOException $e) {
     echo $e->getMessage();
   }
 }

 $DBcon = null;

?>
