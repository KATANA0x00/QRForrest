<?php
include("./server_setting.php");
$conn = mysqli_connect($host, $user, $pass, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM QRTicket.Ticket WHERE Ticket_ID = " . $_GET['ID'];

$result = mysqli_query($conn, $sql);

$data = mysqli_fetch_assoc($result);

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($data);
?>