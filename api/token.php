<?php

  $token_url = "https://graph.facebook.com/oauth/access_token?client_id=".FACEBOOK_CLIENT_ID."&client_secret=".FACEBOOK_SECRET."&grant_type=fb_exchange_token&fb_exchange_token=".$token;

  $c = curl_init();
  curl_setopt($c, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($c, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($c, CURLOPT_URL, $token_url);
  $contents = curl_exec($c);
  $err  = curl_getinfo($c,CURLINFO_HTTP_CODE);
  curl_close($c);

  $paramsfb = null;
  parse_str($contents, $paramsfb);

?>
