<?php

include "db_connect.php";

$return_arr = array();
$query = "SELECT * FROM champion_suggestions ORDER BY id desc";
$result = mysqli_query($con,$query);

//    $result = $conn->query($sql);
//    $payload = null;




        // output data of each row
        while($row = $result->fetch_assoc()) {
//        echo "id: " . $row["id"]. " - Name: " . $row["Title"]. "Info: " . $row["Description"]. "<br>";
            $id = $row['id'];
            $hero = $row['Title'];
            $info = $row['Description'];

            $return_arr[] = array(
                "id" => $id,
                "Title" => $hero,
                "Description" => $info);


//            $payload = json_encode($row);
//            echo $payload;
        }


//    echo "cool";
echo json_encode($return_arr);
mysqli_close($con);




?>