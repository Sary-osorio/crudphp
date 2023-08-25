<?php

class Database {

public $hostname, $dbname, $username, $password, $conn;

function __construct() {
    $this->host_name = "localhost";
    $this->dbname = "test";
    $this->username = "root";
    $this->password = "";
    try {
        $this->conn = new PDO("mysql:host=$this->host_name;dbname=$this->dbname", $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

function customSelect($sql) {
    try {
         $stmt = $this->conn->prepare($sql);
        $result = $stmt->execute();
        $rows = $stmt->fetchAll(); 
        return $rows;
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
}

function select($tbl, $cond="", $param="") {
    $param = $param=="" ? "" : $param;

    $sql = "SELECT * $param FROM $tbl";
    
    if ($cond!='') {
        $sql .= " WHERE $cond ";
    }
    // $sql .= " LIMIT $limit OFFSET $offset";

    try {
         $stmt = $this->conn->prepare($sql);
        $result = $stmt->execute();
        $rows = $stmt->fetchAll();
        return $rows;
    } catch (PDOException $e) {

        echo 'Error: ' . $e->getMessage();
        return $sql;
    }
}
function num_rows($rows){
     $n = count($rows);
     return $n;
}

function delete($tbl, $cond='') {
    $sql = "DELETE FROM `$tbl`";
    if ($cond!='') {
        $sql .= " WHERE $cond ";
    }

    try {
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->rowCount();
    } catch (PDOException $e) {
        return 'Error: ' . $e->getMessage();
    }
}

function insert($tbl, $arr) {
    $sql = "INSERT INTO $tbl (`";
    $key = array_keys($arr);
    $val = array_values($arr);
    $sql .= implode("`, `", $key);
    $sql .= "`) VALUES ('";
    $sql .= implode("', '", $val);
    $sql .= "')";

    $sql1="SELECT MAX( id ) FROM  `$tbl`";
    try {

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $stmt2 = $this->conn->prepare($sql1);
        $stmt2->execute();
        $rows = $stmt2->fetchAll();
        return $rows[0][0];
    } catch (PDOException $e) {
        return 'Error: ' . $e->getMessage();
    }
}

function update($tbl, $arr, $cond) {   
    $sql = "UPDATE $tbl SET ";
    $fld = array();
    foreach ($arr as $k => $v) {
        $fld[] = "`$k` = '$v'";
    }
    $sql .= implode(", ", $fld);
    $sql .= " WHERE " . $cond;

    try {
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->rowCount();
    } catch (PDOException $e) {
        return 'Error: ' . $e->getMessage();
    }
}
}

?>