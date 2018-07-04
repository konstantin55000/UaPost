// Copyright (c) 2018 Konstantin Pryanikov. All rights reserved. 

// Creates an `input[type="file]`  
let fileChooser = document.createElement('input');

// Wrap it in a form for resetting  
let form = document.createElement('form');
 
let arrayAddr = [];
arrayAddr.push(new Array());
let processedAddr = [];
localStorage.j = 0;
 
 
function loadHandler(event) {
    let csv = event.target.result;

 
    parsedData = csvToArray(csv);
    
    let n = 0;
    for (let currRow of parsedData) {
        if (currRow == "") {
            arrayAddr.push(new Array());
            n++;
        } else {
            arrayAddr[n].push(currRow);
        }

    }
    //set array address in chrome storage
    chrome.storage.sync.set({
        'arrAddr': arrayAddr,
        'j': 0
    });


    //end load handler
}
 
 
function getCurrentUrl() {

    chrome.tabs.getSelected(null, function (tab) {
        var tablink = tab.url;
        console.log(tablink);
        return tablink;
    });
    return '';
}

   
function csvToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}
 



function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
    alert('On file load error!');
}

function eventFire(el, etype) {
    if (el.fireEvent) {
        el.fireEvent('on' + etype);
    } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
    }
}
  
//this is in background page
//when Process button clicked: send to background page for processing
function processNextAddress() {

    chrome.storage.sync.get("j", function (holder) {
        var arrAddr = chrome.storage.sync.get("arrAddr", function (obj) {
            let j = holder.j;
             
            if (typeof obj.arrAddr[j] === undefined) {
                return;
            }

            let arrAddr = obj.arrAddr;

            //send message to background page
            chrome.runtime.sendMessage({
                    greeting: 'popup',
                    startProcessing: true,
                    count: arrAddr.length,
                    arrAddr: obj.arrAddr
                },
                function (response) {
                    console.log('response at the popup', response);
                }); 

            j++;

            chrome.storage.sync.set({
                'j': j
            }, function (currentObj) {
                console.log('current j:', currentObj);
            });

        }); //sync get storage
    });
} 
 
 
//add csv file input logic
form.appendChild(fileChooser);
fileChooser.type = 'file';
fileChooser.addEventListener('change', function () {
    var fileToRead = fileChooser.files[0];
    console.log('sended action browseAndUpload');
    var reader = new FileReader();
    // Read file into memory as UTF-8
    reader.readAsText(fileToRead);
    // Handle errors load
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
});

  
//add appropriate events to buttons 
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener('click', function () {  
        fileChooser.click();
 
    });
    document.getElementById('copyAddress').addEventListener('click', function () {
        processNextAddress(); //j++ in processNextAddress success callback
    });
});
