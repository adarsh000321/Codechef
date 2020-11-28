<?php

function addTag($tag, $type, $user){

    $cmd = "INSERT INTO `tags` (`tag`, `type`, `user`,`count`) VALUES ('$tag','$type','$user','1')";

    $tags = query("SELECT * FROM `tags` WHERE `tag`='$tag' AND `type`='$type' AND `user`='$user'");
    if(count($tags)>0){
        $cmd = "UPDATE `tags` SET `count`=`count`+1 WHERE `tag`='$tag' AND `type`='$type' AND `user`='$user'";
    }

    $db = new db();
    $pdo = $db->connect();

    $sql = $pdo->prepare($cmd);
    if($sql->execute()){
        return array("success"=>"true");
    }else {
        return $sql->errorInfo();
    }
}

function query($cmd){
    try{
        $db = new db();
        $pdo = $db->connect();

        $sql = $pdo->query($cmd);
        $data = $sql->fetchAll(PDO::FETCH_OBJ);
        return $data;
    }catch(Exception $e){
        return array("success"=>"false", "error"=>$e->getMessage());
    }
}

function addProblem($name, $code, $sub, $accuracy, $tags, $author, $difficulty){

    $cmd = "INSERT INTO `problems` (`code`, `name`, `submissions`, `accuracy`, `difficulty`) VALUES ('$code','$name','$sub','$accuracy','$difficulty')";

    $db = new db();
    $pdo = $db->connect();

    $sql = $pdo->prepare($cmd);
    if($sql->execute()){

        $problem_id = query("SELECT `id` FROM `problems` WHERE `code`='$code' AND `name`='$name'");
        $problem_id = $problem_id[0]->id;

        //add tags
        foreach($tags as $tag){
            addTag($tag, "tag",NULL);

            //map (many to many)
            $tag_id = query("SELECT `id` FROM `tags` WHERE `tag`='$tag' AND `type`='tag'");
            $tag_id = $tag_id[0]->id;
            
            //insert into mapping table
            $cmd = "INSERT INTO `problems_tags` (`problem_id`, `tag_id`) VALUES ('$problem_id','$tag_id')";
            $sql = $pdo->prepare($cmd);
            $sql->execute();
            
        }

        //add author
        addTag($author, "author", NULL);

        return array("success"=>"true");
    }else {
        return $sql->errorInfo();
    }
}

// get problems with this tag
// assume type tag and type author cannot have same tag name
function getProblems($tag){
    try{
        $tag_id = query("SELECT `id` FROM `tags` WHERE `tag`='$tag' AND (`type`='tag' OR `type`='author')");
        if(count($tag_id)==0)return array();
        $tag_id = $tag_id[0]->id;

        $problem_ids = query("SELECT `problems`.`id` FROM `problems`
        JOIN `problems_tags` ON `problems`.`id` = `problems_tags`.`problem_id`
        WHERE `problems_tags`.`tag_id` = '$tag_id'");

        if(count($problem_ids)==0)return array();
        $problemIds = [];
        foreach($problem_ids as $objs){
            array_push($problemIds, $objs->id);
        }
        return $problemIds;
    }catch(Exception $e){
        return array("success"=>"false","error"=>$e->getMessage());
    }
}


// get all tags of this problem
function getTags($code){
    try{
        $problem_id = query("SELECT `id` FROM `problems` WHERE `code`='$code'");
        if(count($problem_id)==0)return array();
        $problem_id = $problem_id[0]->id;

        $tag_ids = query("SELECT `tags`.`id` FROM `tags`
        JOIN `problems_tags` ON `tags`.`id` = `problems_tags`.`tag_id`
        WHERE `problems_tags`.`problem_id` = '$problem_id'");

        if(count($tag_ids)==0)return array();
        $tagIds = [];
        foreach($tag_ids as $objs){
            array_push($tagIds, $objs->id);
        }
        return $tagIds;
    }catch(Exception $e){
        return array("success"=>"false","error"=>$e->getMessage());
    }
}


