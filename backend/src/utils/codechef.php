<?php




// function refresh_token(){
//     $oauth_config = array('grant_type' => 'refresh_token', 'refresh_token'=> $_SESSION["refresh_token"], 'client_id' => '453402f4d201bc3919ed7757891b1b71',
//         'client_secret' => 'd60b233fd44a766801040ea945faa617');
//     $response = json_decode(make_curl_request('https://api.codechef.com/oauth/token', $oauth_config), true);
//     $result = $response['result']['data'];
//     $_SESSION["refresh_token"] = $result['refresh_token'];
//     $_SESSION["access_token"] = $result['access_token'];
//     // echo json_encode($result);
// }

function make_curl_request($url, $post = FALSE, $headers = array())
{
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);

    if ($post) {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($post));
    }

    $headers[] = 'content-Type: application/json';
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($ch);
    return $response;
}

function codechef_req($url, $queryParams = array()){
    $tmp_url = $url;
    // Query params
    $url = $_SESSION['c_url'].$url.'?';
    foreach($queryParams as $x => $val) {
        $url = $url."$x=$val&";
    }
    
    // Set token
    $header[] = "Authorization: Bearer ";
    if(!isset($_SESSION["token"])){
        $_SESSION["token"] = getToken();
    }

    // token
    $header[0] = $header[0].$_SESSION["token"];

    // Make req
    $data = json_decode(make_curl_request($url,false, $header), true);

    // Recurse if token expired
    if(isset($data["status"]) && $data["status"]=="error" && isset($data["result"]["errors"][0]["code"]) && $data["result"]["errors"][0]["code"]=="unauthorized"){
        $_SESSION["token"] = getToken();
        return codechef_req($tmp_url, $queryParams);
    }
    return $data;
}

function getToken(){
    $token_url = "https://api.codechef.com/oauth/token";
    $body = json_decode(
        '{
            "grant_type": "client_credentials",
            "client_id":"453402f4d201bc3919ed7757891b1b71",
            "client_secret":"d60b233fd44a766801040ea945faa617",
            "redirect_uri":"http://localhost:8000",
            "scope":"public"
        }', true
    );
    
    $data = json_decode(make_curl_request($token_url, $body), true);

    return $data["result"]["data"]["access_token"];
}


