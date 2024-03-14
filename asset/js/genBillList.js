let xhr = new XMLHttpRequest();

const urlParams = new URLSearchParams(window.location.search);
var Amount = urlParams.get('Amount');

xhr.open('GET', 'billList.php?Amount=' + encodeURIComponent(Amount));

xhr.onload = function () {
    if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);

        var table = document.getElementById("BillList");
        var tbody = table.getElementsByTagName("tbody")[0];

        for (let i = 0; i < data.length; i++) {

            var row = tbody.insertRow(i);

            var Date = row.insertCell(0);
            Date.innerHTML = data[i].Pay_Date;
            Date.style.width = '40%';

            var ID = row.insertCell(1);
            ID.innerHTML = data[i].Pay_ID;
            ID.style.width = '40%';

            var Credit = row.insertCell(2);
            Credit.innerHTML = data[i].Pay_Amount;
        }
    } else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
