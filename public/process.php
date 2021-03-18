<?php
header("Access-Control-Allow-Origin: *");

include('../includes/config.php');
include('../includes/functions.php');

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

if (empty($_POST['fromName']) || 
	empty($_POST['fromEmail']) ||
	empty($_POST['toEmail']) ||
	empty($_POST['check'])) die();

$fromName = sanitizeString($_POST['fromName']);
$fromEmail = sanitizeString($_POST['fromEmail']);
$toName = sanitizeString($_POST['toName']);
$toEmail = sanitizeString($_POST['toEmail']);
$year = sanitizeString($_POST['year']);
$check = sanitizeString($_POST['check']);
$whichTutorial = sanitizeString($_POST['whichTutorial']);
$msg = '';
$db_table = '';
$db_cols = '';
$title_for_email = '';
$solution = 0;

switch ($whichTutorial) {
	case 'apa':
		$db_table = 'quiz_apa';
		$db_cols = 24;
		$title_for_email = 'APA Citation';
		$solution = 18;
		break;
	case 'mla':
		$db_table = 'quiz_mla';
		$db_cols = 24;
		$title_for_email = 'MLA Citation';
		$solution = 16;
		break;
	case 'evaluating':
		$db_table = 'quiz_eval_res_react';
		$db_cols = 18;
		$title_for_email = 'Evaluating Sources';
		$solution = 24;
		break;
	case 'plagiarism':
		$db_table = 'quiz_plagiarism_react';
		$db_cols = 18;
		$title_for_email = 'Plagiarism';
		$solution = 27;
		break;
	case 'scholarly':
		$db_table = 'quiz_scholarly_react';
		$db_cols = 24;
		$title_for_email = 'Scholarly Publications';
		$solution = 30;
		break;
	default:
		$db_table = null;
		$db_cols = 1;
		$title_for_email = 'test';
}

// $db_table = 'quiz_apa';

if ($_POST) {

	$probablyIC = 0;
	if ( preg_match('/ithaca\.edu/', $toEmail) || preg_match('/ithaca.edu/', $fromEmail)) {
	    $probablyIC = 1;
	}

	// Write stuff to the database
	if ($probablyIC) {

		$db = db_connect();
//		$answers_array = json_decode($_POST['record'], true);
		$answers_array = $_POST['record'];

		$query = 'INSERT INTO ' . $db_table . ' ';
		$query_bit_1 = "(year, ";
    	$query_bit_2 = "('" . $year . "', ";

    	$i = 0;
	    foreach ($answers_array as $k1 => $v1) {
	    	foreach ($v1 as $k => $v) {
	    		$n = $k1 + 1;
	    		$query_bit_1 .= 'q' . $n . '_' . from_camel_case($k);
	    		if ($i < 35) {
	    			$query_bit_1 .= ', ';
	    		}
	    		$val = toSQL($v);
	    		$query_bit_2 .= $val;
	    		if ($i < 35) {
	    			$query_bit_2 .= ', ';
	    		}
	    		$i++;
	    	}
	    }

		$query .= $query_bit_1;
	    $query .= ") VALUES ";
	    $query .= $query_bit_2;
	    $query .= ")";

	    $query_final = preg_replace('/, \)/', ')', $query);

	    $error_message = "";

	    try {
	        $db->exec($query_final);
	    } catch(PDOException $e) {
	        $error_message = $e->getMessage();
	    }

	    // $msg .= "<br>" . $query_final . "<br><br>" . $error_message . "<br><br>";

	}

	// set response code - 200 OK
	http_response_code(200);

	// Email people
	$subjectLine = 'IC Library ' . $title_for_email . ' Tutorial';

	// data
	$msg .= $fromName . ' (' . $fromEmail . ') has completed the IC Library ' . $title_for_email . ' Tutorial.';

	// Headers
	$headers = "MIME-Version: 1.0\r\n";
	$headers.= "Content-type: text/html; charset=UTF-8\r\n";
	$headers.= "From: 'Library No Reply' <libweb@ithaca.edu>\r\n";
	// $headers.= "Reply-To " . $fromEmail ."\r\n";

	if ($check == $solution
    && preg_match('/\w+\@\w+\.\w{2,4}(\.\w{2,4})?/',$toEmail) 
    && preg_match('/\w+\@\w+\.\w{2,4}(\.\w{2,4})?/',$fromEmail)
    && isset($fromName)) {
        mail($toEmail, $subjectLine, $msg, $headers);
        mail($fromEmail, $subjectLine, $msg, $headers);
	}

	echo json_encode(array(
		"sent" => true
	));

} else {
	// tell the user about error
	echo json_encode(["sent" => false, "message" => "Something went wrong"]);
}

function sanitizeString($var) {
	$var = stripslashes($var);
	$var = htmlentities($var);
	$var = strip_tags($var);
	return $var;
}

function from_camel_case($input) {
  preg_match_all('!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!', $input, $matches);
  $ret = $matches[0];
  foreach ($ret as &$match) {
    $match = $match == strtoupper($match) ? strtolower($match) : lcfirst($match);
  }
  return implode('_', $ret);
}

function toSQL($var) {
	$t = getType($var);
	switch($t) {
		case "boolean":
			if ($var) {
				return 1;
			} else {
				return 0;
			}
			break;
		case "string":
			return "'" . preg_replace('/,/', ' ', $var) . "'";
			break;
		default:
			return strval($var);
	}
}
