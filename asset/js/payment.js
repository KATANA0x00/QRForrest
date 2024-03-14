var xhr = new XMLHttpRequest();
let bill_list = [];
var amount = 0;
var total_credit = 0;


document.getElementById("amount-box").addEventListener('change', function () {
    amount = document.getElementById("amount-box").value;
    checkCredit();
});

function SeashIn(ID) {
    for (let i = 0; i < bill_list.length; i++) {
        if(bill_list[i].id === ID) return true;
    }
    return false;
}

function checkCredit() {
    // if (bill_list.length == 0) total_credit = -1;
    document.getElementById("label-total").innerHTML = total_credit;
    document.getElementById("label-need").innerHTML = amount - total_credit;
    var btt = document.getElementById("finish-button");
    if (document.getElementById("amount-box").value == "") {
        btt.style.backgroundColor = "#979797";
        btt.addEventListener("mouseover", () => {
            btt.style.border = "solid transparent 2px";
            btt.style.color = "white";
        });
        btt.onclick = null;
    }
    else {
        btt.style.backgroundColor = "#54B256";
        btt.addEventListener("mouseover", () => {
            btt.style.border = "solid var(--third) 2px";
            btt.style.color = "var(--third)";
        });
        btt.addEventListener("mouseout", () => {
            btt.style.border = "solid transparent 2px";
            btt.style.color = "white";
        });
        btt.onclick = function() { submitBill(); }
    }
}

function replaceWithInput() {
    var input = document.createElement("input");

    input.setAttribute("type", "text");
    input.setAttribute("id", "input-qr");

    var button = document.getElementById("add-qr");
    button.parentNode.insertBefore(input, button);
    button.parentNode.removeChild(button);
    input.focus();

    input.addEventListener("input", function () {
        if (input.value.length === 11) {
            if(SeashIn(input.value)){
                input.value = null;
                input.focus;
                return;
            }
            xhr.open('GET', 'getQR_data.php?ID=' + input.value, true);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let data = JSON.parse(xhr.responseText);
                    if (data != null) {
                        const obj = {
                            id: data.Ticket_ID,
                            credit: data.Credit
                        }
                        bill_list.push(obj);
                        buildInnerBox();
                    }

                }
            };
            xhr.send();
            input.value = null;
            input.focus;
        }
    });
};

function buildInnerBox() {
    let content = '';
    total_credit = parseInt(0);
    for (let i = 0; i < bill_list.length; i++) {
        content += '<div class="qr-box-contect" id="' + i + '">';
        content += '<label>' + bill_list[i].id + '</label>';
        content += '<label></label>';
        content += '<label>' + bill_list[i].credit + '</label>';
        content += '<button class="button-delete" onclick="deleteQR(' + i + ')"><img src="asset/img/delete.png"></button>';
        content += '</div>';
        total_credit += parseInt(bill_list[i].credit);
    }
    document.getElementById("qr-box").innerHTML = content;
    checkCredit();
};

function deleteQR(index) {
    bill_list.splice(index, 1);
    buildInnerBox();
    document.getElementById("input-qr").focus();
};

function submitBill() {
    for (let i = 0; i < bill_list.length; i++) {
        let xhr = new XMLHttpRequest(); // Create a new xhr object for each iteration
        let amount_need = (amount <= bill_list[i].credit ? amount : bill_list[i].credit);
        amount -= amount_need;
        if(amount < 0) amount = 0;
        xhr.open('GET', 'submitBill.php?ID=' + bill_list[i].id + '&amount=' + amount_need, true);
        xhr.send();
    }
    window.location.href = "billList.html?Amount="+bill_list.length;
}