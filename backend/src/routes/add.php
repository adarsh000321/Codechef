<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

// Delete table
$app->get('/drop-table/{name}', function(Request $req, Response $res, array $args){
    try{
        $name = $args["name"];
        $db = new db();
        $pdo = $db->connect();
        $sql = $pdo->prepare("DROP TABLE $name");
        if($sql->execute()){
            return $res->withJSON(
                array("success"=>"true"),
                200,
                JSON_UNESCAPED_UNICODE
            );
        }else {
            return $res->getBody()->write($sql->errorInfo());
        }

    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }
});



// Create table
$app->get('/create-table/{type}', function(Request $req, Response $res, array $args){
    try{

        if($args["type"]==="tags"){

            //tags
            $cmd = "CREATE TABLE `tags` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `tag` VARCHAR(256) NOT NULL,
                `type` VARCHAR(256) NOT NULL,
                `user` VARCHAR(256),
                `count` INT NOT NULL DEFAULT 0,
                PRIMARY KEY (`id`)
            ) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci";
        }else if($args["type"]==="problems"){

            // problems
            $cmd = "CREATE TABLE `problems` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `code` VARCHAR(256) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
                `name` VARCHAR(1000) NOT NULL,
                `submissions` INT NOT NULL,
                `accuracy` DECIMAL(11, 2) NOT NULL,
                `difficulty` VARCHAR(128) NOT NULL,
                PRIMARY KEY (`id`)
            ) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci";
        }else if($args["type"]==="problems_tags"){

            // problems and tags mapping table
            $cmd = "CREATE TABLE `problems_tags` (
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
                `problem_id` INT UNSIGNED NOT NULL,
                `tag_id` INT UNSIGNED NOT NULL,
                FOREIGN KEY (`problem_id`)
                    REFERENCES `problems`(`id`)
                    ON DELETE CASCADE,
                FOREIGN KEY (`tag_id`)
                    REFERENCES `tags`(`id`)
                    ON DELETE CASCADE,
                PRIMARY KEY (`id`)
            ) ENGINE=INNODB CHARACTER SET utf8 COLLATE utf8_general_ci";

        }
        $db = new db();
        $pdo = $db->connect();

        $sql = $pdo->prepare($cmd);
        if($sql->execute()){
            return $res->withJSON(
                array("success"=>"true"),
                200,
                JSON_UNESCAPED_UNICODE
            );
        }else {
            return $res->getBody()->write($sql->errorInfo());
        }

    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }
});


// add tag 
$app->post('/add-tag', function(Request $req, Response $res, array $args){
    
    try{
        $tag = $req->getParam("tag");
        $type = $req->getParam("type");
        $user = $req->getParam("user");

        $sql = addTag($tag,$type,$user);
        if($sql){
            return $res->withJSON(
                array("success"=>"true"),
                200,
                JSON_UNESCAPED_UNICODE
            );
        }else {
            return $res->getBody()->write($sql);
        }
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});

// add problem
$app->post('/add-problem', function(Request $req, Response $res, array $args){
    
    try{
        $name = $req->getParam("name");
        $code = $req->getParam("code");
        $sub = $req->getParam("sub");
        $accuracy = $req->getParam("accuracy");
        $tags = $req->getParam("tags");
        $author = $req->getParam("author");
        $difficulty = $req->getParam("difficulty");

        $sql = addProblem($name,$code,$sub, $accuracy, $tags, $author, $difficulty);
        if($sql){
            return $res->withJSON(
                array("success"=>"true"),
                200,
                JSON_UNESCAPED_UNICODE
            );
        }else {
            return $res->getBody()->write($sql);
        }
    }catch(Exception $e){
        return $res->withJSON(
            array("success"=>"false","error"=>$e->getMessage()),
            400,
            JSON_UNESCAPED_UNICODE
        );
    }

});









