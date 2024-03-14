<?php
    include("./server_setting.php");
    $conn = mysqli_connect($host, $user, $pass, $database);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $count = 0;
    $t=time();

    while($count < $_POST['Amount']){
        $sql = "INSERT INTO QRTicket.Ticket
                (Ticket_ID,Credit) 
                VALUE ('"
                .($t.(++$count))."'"
                .",".($_POST['Credit'] == "" ? "150" : $_POST['Credit']).");";
        echo $sql;
        $result = mysqli_query($conn, $sql);
    }

    mysqli_close($conn);

    header("Location: ticketList.html?Amount=".$_POST['Amount']);
?>
