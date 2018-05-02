<?php

  header('Access-Control-Allow-Origin: *');

 require('db_config.php');

 if($_GET['getRegistered']) {

   $lat = $_GET['lat'];
   $lng = $_GET['lng'];
   $raio = $_GET['raio'];
   $raio = $raio/1000;
   //echo $raio;

    try {
      $sql = $DBcon->prepare('SELECT *,  ( 6371 * acos( cos( radians(' . $lat . ') ) * cos( radians( place_lat ) ) * cos( radians( place_lng ) - radians(' . $lng . ') ) + sin( radians(' . $lat . ') ) * sin( radians( place_lat ) ) ) ) AS distance FROM places HAVING distance < ' . $raio);
      $sql->execute();

      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $count = $sql->rowCount();

      // $results = $sql->fetchAll(PDO::FETCH_ASSOC);
      //
      // echo $results;

      while ($row = $sql->fetchAll(PDO::FETCH_ASSOC)) {
        print_r(json_encode($row));
      }


      //echo $count;
      //print $count;
    } catch(PDOException $e) {
      echo $e->getMessage();
    }

 }

$DBcon = null;

?>
