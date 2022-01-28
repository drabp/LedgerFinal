//https://docs.google.com/spreadsheets/d/1XJgihZfm-od1FnMyqfvUrEOlM7QzrkS51KVpjwVPGO4/edit?usp=sharing


const url = 'https://docs.google.com/spreadsheets/d/';
const ssID = '1XJgihZfm-od1FnMyqfvUrEOlM7QzrkS51KVpjwVPGO4';
const query1 = '/gviz/tq?';
const q2 = 'tqx=out:json';
let ssName = '';
let query = '';
let endpoint = ``;
// Account List
ssName = 'sheet=Account';
query = encodeURIComponent('select A,C WHERE B ="AT014" OR B="AT015" ORDER By C');
endpoint = `${url}${ssID}${query1}&${q2}&${ssName}&tq=${query}`;
const accountList = document.getElementById('account');

fetch(endpoint)
    .then(res => res.text())
    .then(data => {
        const temp = data.substring(47).slice(0, -2);
        const json = JSON.parse(temp);
        //console.log(json.table.rows);
        const accountRows = json.table.rows;
        accountRows.forEach((row) => {
            let option = document.createElement('option');
            //ID
            option.value = row.c[0].v;
            //NAME
            option.text = row.c[1].v;

            accountList.appendChild(option);
        })
    })

const table = document.querySelector('#d-table');
const title = document.querySelector('.title');
function getRecords() {
    table.innerHTML = '';
    var x = accountList.selectedIndex;
    var y = accountList.options;
    var value = y[x].value;
    title.innerHTML = y[x].text;
    // Account Ledger Records
    ssName = 'sheet=Posting1';
    query = encodeURIComponent('select B,D,F,H,I,J,K,L where A="' + value + '" AND R <>"YES" AND U <>"YES" ORDER By D');
    endpoint = `${url}${ssID}${query1}&${q2}&${ssName}&tq=${query}`;
    fetch(endpoint)
        .then(res => res.text())
        .then(data => {
            const temp = data.substring(47).slice(0, -2);
            const json = JSON.parse(temp);
            const rows = json.table.rows;
            var rowNumbers = json.table.rows.length;
            if (rowNumbers > 0) {
                rows.forEach((row) => {
                    //console.log(row.c);
                    const div = document.createElement('div');
                    div.classList.add('rowDiv');
                    const temp1 = row.c;
                    var trow = document.createElement("tr");
                    temp1.forEach((cell, index) => {
                        var value = "";
                        if (cell.f !== undefined) {
                            console.log(cell.f);
                            console.log(cell.f.length);
                            var valueLegnth = cell.f.length;
                            if (valueLegnth == 19) { value = cell.f.slice(0, -9); }
                            else { value = cell.f; }
                        }
                        else { value = cell.v; }
                        // const box = document.createElement('div');
                        // box.textContent += value;
                        // box.classList.add('box');

                        // div.appendChild(box);

                        var tcol = document.createElement("td");
                        if (index == 0) { tcol.setAttribute('style', 'display:none;') }
                        if (index == 1) { tcol.setAttribute('style', 'text-align:left;') }
                        if (index == 2) { tcol.setAttribute('style', 'text-align:left;') }
                        if (index == 3) { tcol.setAttribute('style', 'text-align:left;') }
                        if (index == 4) { tcol.setAttribute('style', 'text-align:left;') }
                        if (index == 5) { tcol.setAttribute('style', 'text-align:right;') }
                        if (index == 6) { tcol.setAttribute('style', 'text-align:right;') }
                        if (index == 7) { tcol.setAttribute('style', 'text-align: right;') }
                        tcol.innerText += value;
                        trow.appendChild(tcol);
                    })

                    table.appendChild(trow);

                });
            }
            else {
                alert("No Recods Found !");
            }
        })
}