<?php

function cors() {

    // Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }

    //echo "You have CORS!";
}

cors();

  $token = trim($_POST['token']);
  //echo $token;
  //
  $token_url = "https://graph.facebook.com/oauth/access_token?client_id=421179368284908&client_secret=0b8265a8d887b784b49a3ae6b726eed6&grant_type=fb_exchange_token&fb_exchange_token=".$token;
  //
  $c = curl_init();
  curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($c, CURLOPT_URL, $token_url);
  $contents = curl_exec($c);
  $err  = curl_getinfo($c,CURLINFO_HTTP_CODE);
  curl_close($c);

  $paramsfb = null;
  parse_str($contents, $paramsfb);

  $array = json_decode($contents,true);

  //print_r($paramsfb);

  echo $contents


?>
