<?php

require('./inc/config.inc.php');

function errorhandler($errno = null,
                      $errstr = 'Unknown Error.',
                      $errfile = null, $errline = null, $errcontext = null) {
  $E = array('error' => $errstr);
  if (isset($errno)) $E['errno'] = $errno;
  if (isset($errfile)) $E['errfile'] = $errfile;
  if (isset($errline)) $E['errline'] = $errline;
  print json_encode($E);
  exit();
  return true; /* Don't execute PHP internal error handler */
}

error_reporting(E_ALL | E_STRICT);
set_error_handler('errorhandler');
setlocale(LC_ALL, 'en_US', 'english_us'); // U*IX, Windows

header('Content-type: text/javascript; charset=utf-8');
