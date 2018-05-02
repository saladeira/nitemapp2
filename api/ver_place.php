<?php

 require('db_config.php');

 if($_GET['fromPlace']) {

    $fbID_ver = trim($_GET['id']);

    try {
      $sql = $DBcon->prepare('SELECT fb_id FROM places WHERE fb_id = ?');
      $sql->execute(array($fbID_ver));

      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $count = $sql->rowCount();

      if ($count == 0) {
        //echo json_encode(array('email' => false, 'rowData' => $row));
        echo 'nao existe';
      }

      if ($count == 1) {
        echo 'existe';
        //echo json_encode(array('email' => true, 'rowData' => $row));
      }

      //echo $count;
      //print $count;
    } catch(PDOException $e) {
      echo $e->getMessage();
    }

 }

$DBcon = null;

?>
