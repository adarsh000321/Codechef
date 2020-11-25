<?php

    class db {

        private static $dbConnection;

        public function connect(){

            if(static::$dbConnection === NULL){
                $dbhost = 'sql12.freemysqlhosting.net';
                $dbuser = 'sql12378375';
                $dbpass = 'NLcFSk1yBi';
                $dbname = 'sql12378375';
                static::$dbConnection = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
                static::$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }
            return static::$dbConnection;
        }
    }