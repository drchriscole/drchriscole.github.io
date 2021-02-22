
function main() {
    var pTable = document.getElementsByClassName("mod-ui-table mod-tearsheet-historical-prices__results mod-ui-table--freeze-pane");
    var rowLength = pTable[0].rows.length;
    console.log("Found table with " + rowLength + " rows");
    var price = pTable[0].rows.item(1).cells.item(4).innerText;
    var prices = [];
    // start at 1 to avoid header row
    for (i = 1; i < rowLength; i++){

        // get cells of current row
        var pCells = pTable[0].rows.item(i).cells;
        // the date string is not what we want, fix it:
        //   "Thursday, February 11, 2021" -> "11/Feb/2021"
        var str = pCells.item(0).innerText;
        var d = new Date(str);
        var date = d.getDate().toString();
        // months are zero-indexed so need to add 1
        var month = d.getMonth() + 1;
        month = month.toString();
        var year = d.getFullYear();
        // add date and price to array (remove thousands separator)
        prices.push({price: pCells.item(4).innerText.replace(",",""), 
                     date: date.padStart(2, "0") + '/' + month.padStart(2, "0") + '/' + year});

    }
    // reverse order of price data to have newest date last
    data = tsvFormat(prices.reverse());
    
    var symbStr = document.getElementsByClassName("mod-tearsheet-overview__header__symbol");
    console.log("symbStr: " + symbStr);
    var symStrSplt = symbStr[0].split(":");
    var sym = symStrSplt[0];
    var units = symStrSplt[1];
    console.log(`Got ${sym} with ${units} units`);

    download("prices.tsv", data);
}

/*
   Function to take array of dates and prices and convert
   to tab-delimited data format.
 */
function tsvFormat(obj) {
    var output = '';
    console.log("Legnth of object is: " + obj.length);
    for (i = 0; i < obj.length; ++i) {
        output = output + `${obj[i].date}\t${obj[i].price}\n`
    }
    return(output)
}

/* 
   Given a filename and some text create a file download
   of the text saved as the filename
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    // hide link and add it to the page
    element.style.display = 'none';
    document.body.appendChild(element);
  
    // click the link and then remove it
    element.click();
    document.body.removeChild(element);
}
  
