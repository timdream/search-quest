<?php

require('./inc/inc.php');

if (!isset($_REQUEST['type']) || $_REQUEST['type'] == '') {
  $type = 'bbs';
} else {
  $type = $_REQUEST['type'];
}

if (!ctype_alnum($type)) {
  errorhandler('type is not safe!');
}

if (!file_exists('./inc/quiz/' . $type . '.txt'))
  errorhandler('type not exist!');

$quiz = array_rand(file('./inc/quiz/' . $type . '.txt'), 36);

print json_encode(array('quiz' => $quiz));
