<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// search with array of tags
$app->post('/api/tags', function(Request $req, Response $res, array $args){
    
    try{
        $tags = $req->getParam("tags");
        $problems = getProblems($tags[0]);
        if(!isset($problems["success"]) && count($problems)){

            // Find all common problem ids
            for($i = 1; $i<count($tags);$i++){
                $new_problems = getProblems($tags[$i]);
                if(!isset($new_problems["success"]) && count($new_problems)){
                    $tmp = [];
                    foreach($problems as $id){
                        if(in_array($id, $new_problems)){
                            array_push($tmp,$id);
                        }
                    }
                    if(count($tmp))$problems = $tmp;
                    else {
                        return $res->withJSON(
                            $tmp,
                            200,
                            JSON_UNESCAPED_UNICODE
                        );
                    }
                }else{
                    return $res->withJSON(
                        array(),
                        200,
                        JSON_UNESCAPED_UNICODE
                    );
                }
            }

            // Get problems with ids
            for($i=0;$i<count($problems);$i++){
                $problems[$i] = query("SELECT * FROM `problems` WHERE `id`='$problems[$i]'")[0];
            }
            return $res->withJSON(
                $problems,
                200,
                JSON_UNESCAPED_UNICODE
            );
        }else{
            return $res->withJSON(
                array(),
                200,
                JSON_UNESCAPED_UNICODE
            );
        }
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});



// get tags of this problem
$app->get('/api/problems/tags/{code}', function(Request $req, Response $res, array $args){
    try{
        $code=$args["code"];
        $tag_ids = getTags($code);

        // Get problems with ids
        for($i=0;$i<count($tag_ids);$i++){
            $tag_ids[$i] = query("SELECT * FROM `tags` WHERE `id`='$tag_ids[$i]'")[0];
        }
        
        return $res->withJSON(
            $tag_ids,
            200,
            JSON_UNESCAPED_UNICODE
        );
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});

// search with problem code
$app->get('/api/problems/code/{code}', function(Request $req, Response $res, array $args){
   
    try {
        $code = $args["code"];
        $data = query("SELECT * FROM `problems` WHERE `code`='$code'");
        return $res->withJSON(
            $data,
            200,
            JSON_UNESCAPED_UNICODE
        );
        
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});

// all tags and type = author/tag
$app->get('/api/tags/{type}', function(Request $req, Response $res, array $args){
    try{
        $type = $args["type"];
        $limit = $req->getParam("limit");
        if($limit===NULL)$limit=100;
        $offset = $req->getParam("offset");
        if($offset===NULL)$offset=0;
        $tags = query("SELECT * FROM `tags` WHERE `type`='$type' LIMIT $limit OFFSET $offset");
        return $res->withJSON(
            $tags,
            200,
            JSON_UNESCAPED_UNICODE
        );
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});

// prefix and type=all,tag,author
$app->get('/api/match-tags/{type}/{prefix}', function(Request $req, Response $res, array $args){

    try{
        $type = $args["type"];
        $prefix = $args["prefix"];
        $limit = $req->getParam("limit");
        if($limit===NULL)$limit=5;
        $tags = [];
        if($type=="all"){
            $tags = query("SELECT * FROM `tags` WHERE `tag` LIKE '%$prefix%' AND (`type` = 'author' OR `type`='tag') LIMIT $limit");
        }else{
            $tags = query("SELECT * FROM `tags` WHERE `tag` LIKE '%$prefix%' AND `type`='$type' LIMIT $limit");
        }

        return $res->withJSON(
            $tags,
            200,
            JSON_UNESCAPED_UNICODE
        );
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});


// search with problem difficulty
$app->get('/api/problems/{difficulty}', function(Request $req, Response $res, array $args){
   
    try {
        $diff = $args["difficulty"];
        $limit = $req->getParam("limit");
        if($limit===NULL)$limit=100;
        $offset = $req->getParam("offset");
        if($offset===NULL)$offset=0;
        $data = query("SELECT * FROM `problems` WHERE `difficulty`='$diff' LIMIT $limit OFFSET $offset");
        return $res->withJSON(
            $data,
            200,
            JSON_UNESCAPED_UNICODE
        );
        
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});



