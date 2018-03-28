<?php
include "db_connect.php";

    $query = "SELECT * FROM champion_suggestions";
    $result = mysqli_query($con, $query);
if(isset($_REQUEST)) {
    $title = $_POST['Title'];
    $description = $_POST['Description'];
    $sql="INSERT INTO champion_suggestions VALUES ('', '$title', '$description')";
    $query = mysqli_query($con,$sql);
    if($query){
        echo ' Data Inserted Successfully';
        mysqli_close($con);
		}


}
?>