<?php
include("./server_setting.php");
$conn = mysqli_connect($host, $user, $pass, $database);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
$sql = "SELECT Credit FROM QRTicket.Ticket WHERE Ticket_ID = \"".$_GET['ID']."\"";
$result = mysqli_query($conn, $sql);

$data = mysqli_fetch_assoc($result);

$pay = $data['Credit'] - ((int)$_GET['amount']);

$sql = "UPDATE QRTicket.Ticket SET Credit = ".$pay." WHERE Ticket_ID = \"".$_GET['ID']."\"";
mysqli_query($conn, $sql);

$sql = "INSERT INTO QRTicket.Bill_List (Pay_ID, Pay_Amount) VALUES (\"".$_GET['ID']."\",".((int)$_GET['amount']).")";
mysqli_query($conn, $sql);

mysqli_close($conn);

$response = array(
    "status" => 200,
    "message" => "Payment processed successfully"
);

header('Content-Type: application/json');
echo json_encode($response);

?>