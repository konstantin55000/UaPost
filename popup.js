// Copyright (c) 2018 Konstantin Pryanikov. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


/* Creates an `input[type="file]` */
var fileChooser = document.createElement('input');

/* Wrap it in a form for resetting */
var form = document.createElement('form');
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


var arrayAddr = [];
arrayAddr.push(new Array());
var processedAddr = [];
localStorage.j = 0;



function loadHandler(event) {
    var csv = event.target.result;

    parsedData = csvToArray(csv);
    //console.log('parsed', parsedData);
    var n = 0;
    for (var i = 0; i < parsedData.length; i++) {
        if (parsedData[i] == "") {
            arrayAddr.push(new Array());
            n++;
        } else {
            arrayAddr[n].push(parsedData[i]);
        }

    }


    //parse all adresses in file
    //recParseAddress(j, arrayAddr.length);
    chrome.storage.sync.set({
        'arrAddr': arrayAddr
    }, function () {
        chrome.storage.sync.set({
            'j': 0
        }, function () {
            //
        });
    });


    //end load handler
}

function recParseAddress(j, length) {
    if (j == length - 1)
        return;
    goShipmentPage();
    setTimeout(function () {
        j++;
        processNextAddress(j);
        setTimeout(function () {
            recParseAddress(j, length);
        }, 1600);

    }, 8000);
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

function goShipmentPage() {
    chrome.tabs.executeScript(null, {
        file: 'addShipment.js'
    }, function (results) {
        console.log('fill address results', results);
    });
}

function getCurrentUrl() {

    chrome.tabs.getSelected(null, function (tab) {
        var tablink = tab.url;
        console.log(tablink);
        return tablink;
    });
    return '';
}


//this is in background page
//button clicked: =) send to background page
function processNextAddress() {

    chrome.storage.sync.get("j", function (holder) {
        var arrAddr = chrome.storage.sync.get("arrAddr", function (obj) {
            var j = holder.j;
            // console.log('obj:', obj);
            // console.log('j', j);
            if (typeof obj.arrAddr[j] === undefined) {
                return;
            }

            var arrAddr = obj.arrAddr;

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



            //            chrome.tabs.executeScript( null, {
            //                code: 'var currentAddress = ' + JSON.stringify(obj.arrAddr[j])+'; var j = '+j+';'
            //            },
            //            function() {
            //                    chrome.tabs.executeScript(null, {file: 'fillAddress.js'}, function(results){
            //                        console.log('fill address results', results);
            //
            //                        if(chrome.runtime.lastError) {
            //                          console.error(chrome.runtime.lastError.message);
            //                        }
            //                    });
            //            });

            j++;

            chrome.storage.sync.set({
                'j': j
            }, function (holder2) {
                console.log('current j:', holder2);
            });

        }); //sync get storage
    });
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


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener('click', function () {
        //chrome.runtime.sendMessage({ action: 'browseAndUpload' });
        fileChooser.click();
        //window.close();
    });
    document.getElementById('copyAddress').addEventListener('click', function () {
        processNextAddress(); //j++ in processNextAddress success callback
    });
});
