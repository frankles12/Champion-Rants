<?php
$con = new mysqli("localhost","fr168559","password","fr168559");

// $con = new mysqli("sulley.cah.ucf.edu","fr168559","knights1234$#","fr168559");

if (mysqli_connect_errno())
{
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}


?>