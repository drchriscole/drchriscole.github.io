
function main() {
    var pTable = document.getElementsByClassName("mod-ui-table mod-tearsheet-historical-prices__results mod-ui-table--freeze-pane");
    var rowLength = pTable[0].rows.length;
    console.log("Found table with " + rowLength + " rows");
    var price = pTable[0].rows.item(1).cells.item(4).innerText;
    var prices = [];
    for (i = 1; i < rowLength; i++){

        var pCells = pTable[0].rows.item(i).cells;
        var str = pCells.item(0).innerText;
        var d = str.split(", ");
        var str2 = d[3];
        if (str2 === undefined) {
            continue
        }
        console.log("Str2: " + str2);
        var yr = d[4];
        var md = str2.split(" ");
        prices.push({price: pCells.item(4).innerText.replace(",",""), 
                     date: md[1] + '/' + md[0] + '/' + yr});

    }
    data = tsvFormat(prices);
    download("prices.tsv", data);
}

function tsvFormat(obj) {
    var output = '';
    console.log("Legnth of object is: " + obj.length);
    for (i = 0; i < obj.length; ++i) {
        output = output + `${obj[i].date}\t${obj[i].price}\n`
    }
    return(output)
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
}
