<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require __DIR__ . '/../vendor/autoload.php';
require __DIR__ . '/../src/utils/codechef.php';
require __DIR__ . '/../src/config/db.php';
require __DIR__ . '/../src/utils/queries.php';

$app = new Slim\App;

//Routes
require __DIR__ . '/../src/routes/add.php';
require __DIR__ . '/../src/routes/get.php';

session_start();
$_SESSION["c_url"] = "https://api.codechef.com";

$app->add(function ($request, $response, $next) {

    // refresh_token();
    $response = $next($request, $response);
	// $response->getBody()->write('AFTER');

	return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
});









































$app->get('/tags/problems', function (Request $request, Response $response, array $args) {

    // PHP array
    $data = codechef_req($request->getUri()->getPath(),$request->getQueryParams());
    // echo count($data["result"]["data"]["content"]);

    return $response->withJSON(
        $data,
        200,
        JSON_UNESCAPED_UNICODE
    );

});


$app->get('/problems/{categoryName}', function (Request $request, Response $response, array $args) {

    // PHP array
    $data = codechef_req($request->getUri()->getPath(),$request->getQueryParams());
    // echo count($data["result"]["data"]["content"]);
    return $response->withJSON(
        $data,
        200,
        JSON_UNESCAPED_UNICODE
    );

});

// filter param (max: 100 returns)
$app->get('/find/{difficulty}', function (Request $request, Response $response, array $args){

    $route = $request->getAttribute('route');
    $difficulty = $route->getArgument('difficulty');

    $params = $request->getQueryParams();
    $params["limit"] = 100;
    $data = codechef_req('/problems'.'/'.$difficulty);
    $tags = codechef_req('/tags/problems', $params);

    $res = array();
    foreach($data["result"]["data"]["content"] as $x=>$val){
        if(isset($tags["result"]["data"]["content"][$val["problemCode"]])){
            array_push($res,$val);
        }
    }
    

    return $response->withJSON(
        $res,
        200,
        JSON_UNESCAPED_UNICODE
    );
});

$app->get('/destroy_session', function (Request $request, Response $response, array $args){
    session_destroy();

    $data = array (
        "status" => "Ok"
    );

    return $response->withJSON(
        $data,
        200,
        JSON_UNESCAPED_UNICODE
    );
});




$app->run();