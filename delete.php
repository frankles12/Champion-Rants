<?php
include "db_connect.php";

$query = "SELECT * FROM champion_suggestions";
$result = mysqli_query($con, $query);


    if(isset($_POST)) {
//        $id = $_POST['id'];
        $title = $_POST['Title'];
//        $description = $_POST['Description'];
//        $delete = $_POST['delete-button'];
        $sql="DELETE FROM champion_suggestions WHERE Title='$title'";

        if($sql){
            echo ' Data Inserted Successfully';
            mysqli_close($con);
        }




}


?>