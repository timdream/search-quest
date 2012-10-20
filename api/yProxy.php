<?

require('./inc/inc.php');

define("POST", true);
define("GET", false);

function fopen_url($url, $cookies='', $config=array()) {
  if ($cookies = '')
    $cookies = 'BX=3wety6xb1Dlrb2&b=4&s=a1; lang=zh-tw';

  return curl_send('GET', $url, array(), $cookies, $config);
}

function curl_send($isPost, $url, $args=array(), $cookies="", $config = array()) {
  $cookie_jar = substr($_SERVER["SCRIPT_FILENAME"], 0, strrpos($_SERVER["SCRIPT_FILENAME"], "/")) . "/cookie-" . session_id() . ".txt";
  $curl_handler = curl_init();
  curl_setopt($curl_handler, CURLOPT_URL, $url);
  curl_setopt($curl_handler, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($curl_handler, CURLOPT_POST, $isPost=="POST"?1:0);
  curl_setopt($curl_handler, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl_handler, CURLOPT_SSL_VERIFYHOST, 2);
  curl_setopt($curl_handler, CURLOPT_SSL_VERIFYPEER, false);

  if ($config["USER_AGENT"]) {
    curl_setopt($curl_handler, CURLOPT_USERAGENT,$config["USER_AGENT"]);
  }

  if ($isPost == "POST") {
    $post_args = "";
    foreach($args as $key=>$value) {
      $post_args.=sprintf("%s=%s&", $key, urlencode($value));
    }
    curl_setopt($curl_handler, CURLOPT_POSTFIELDS, $post_args);
  }

  if (isset($config["header"])) {
    curl_setopt($curl_handler, CURLOPT_HTTPHEADER, $config["header"]);
  }

  if (isset($config["refer"])) {
    curl_setopt($curl_handler, CURLOPT_REFERER, $config["refer"]);
  }

  if ($cookies!="") {
    curl_setopt($curl_handler, CURLOPT_COOKIE, $cookies);
  } else {
    curl_setopt($curl_handler, CURLOPT_COOKIEFILE, $cookie_jar);
  }
  curl_setopt($curl_handler, CURLOPT_COOKIEJAR, $cookie_jar);

  $result = curl_exec($curl_handler);
  if (strpos($result, "error 999"))
    return ("Error999!!!");
  if ($config["to_data_url"]){
    $filetype = curl_getinfo($curl_handler, CURLINFO_CONTENT_TYPE);
    curl_close($curl_handler);
    return sprintf("data:%s;base64,%s", $filetype, base64_encode($result));
  } else {
    curl_close($curl_handler);
    return $result;
  }
}

$q = $_GET["q"];

echo json_encode(
  array("html"=>fopen_url("http://tw.search.yahoo.com/search?p=".urlencode($q)))
);
