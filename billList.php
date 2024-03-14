<?php
include("./server_setting.php");
$conn = mysqli_connect($host, $user, $pass, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_GET['Amount'] == 'all') {
    $sql = "SELECT * FROM QRTicket.Bill_List ORDER BY ID DESC";
} else {
    $sql = "SELECT * FROM QRTicket.Bill_List ORDER BY ID DESC LIMIT " . ((int)$_GET['Amount']);
}

$result = mysqli_query($conn, $sql);
$data = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
}

mysqli_close($conn);

header('Content-Type: application/json');
echo json_encode($data);
?>