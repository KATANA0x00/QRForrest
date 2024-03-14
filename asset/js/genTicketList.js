let xhr = new XMLHttpRequest();

const urlParams = new URLSearchParams(window.location.search);
var Amount = urlParams.get('Amount');

xhr.open('GET', 'TicketList.php?Amount=' + encodeURIComponent(Amount));

xhr.onload = function () {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);

        var table = document.getElementById("TicketList");
        var tbody = table.getElementsByTagName("tbody")[0];

        for (let i = 0; i < data.length; i++) {

            var row = tbody.insertRow(i);

            var QR = row.insertCell(0);
            QR.id = "QRcode";
            var qrcode = new QRCode(QR, {
                text: data[i].Ticket_ID,
                width: 100,
                height: 100,
                colorDark: "#6b4b42",
                colorLight: "#e4ddd9"
            });

            var ID = row.insertCell(1);
            ID.innerHTML = data[i].Ticket_ID;

            var Date = row.insertCell(2);
            Date.innerHTML = data[i].Gen_Date;

            var Credit = row.insertCell(3);
            Credit.style = "background-color: var(--primary);color: var(--third);font-size: 40px;";
            Credit.innerHTML = data[i].Credit + " ฿";
        }

        if (Amount !== 'all') {
            var printWindow = window.open('', '_blank', 'width=600,height=400');
            printWindow.document.write('<html><body>');

            for (let i = 0; i < data.length; i++) {
                printWindow.document.write('<img src="asset/img/logo.png"><br><br>');
                printWindow.document.write('<div id="qrcode-' + i + '" style="margin: auto;"></div>');
                var qrcode2print = new QRCode(printWindow.document.getElementById('qrcode-' + i), {
                    text: data[i].Ticket_ID,
                    width: 100,
                    height: 100
                });
                printWindow.document.write('<br>');

                printWindow.document.write('ID<br>');
                printWindow.document.write(data[i].Ticket_ID);
                printWindow.document.write('<br><br>');

                printWindow.document.write('Date<br>');
                printWindow.document.write(data[i].Gen_Date);
                printWindow.document.write('<br><br>-----------------<br><br>');
            }
            printWindow.document.write('</body></html>');
            printWindow.document.body.style.display = 'flex';
            printWindow.document.body.style.flexDirection = 'column';
            printWindow.document.body.style.textAlign = 'center';
            printWindow.document.body.style.justifyContent = 'center';
            printWindow.document.body.style.fontSize = '14px';
            printWindow.document.close();
            printWindow.onload = function () {
                printWindow.print();
                printWindow.onafterprint = function () {
                    printWindow.close();
                };
            };
        }
    } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
