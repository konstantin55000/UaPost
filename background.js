 var count = 8;
 rowIdx = 0;
 arrAddr = [];
 //send to content script 
 //debugger; 

 //Listen chrome runtime messages
 if (chrome.runtime) {
     chrome.runtime.onMessage.addListener(
         function (request, sender, sendResponse) {

             try {
                 //close current tab if needed
                 if (request.closeThis) {
                     chrome.tabs.remove(sender.tab.id);
                 }
                 if (request.startProcessing == true) {
                     count = request.count;
                     arrAddr = request.arrAddr;
                 }

                 if (rowIdx < count) {
                     //start processing
                     if (request.startProcessing == true || request.rowProcessed == true) {
                         //start all work here  
                         var currAddr = arrAddr[rowIdx]; 
                         //debugger;

                         if (currAddr.length > 0) {
                             chrome.tabs.create({
                                     url: "https://ukrposhta.ua/lk-international/?page=new"
                                 }, function (tab, b, c) {
                                     //add fill address events
                                     chrome.tabs.executeScript(tab.id, {
                                         file: 'fillAddress.js'
                                     }, function (results) {
                                         //console.log('fill address results', results);

                                         if (chrome.runtime.lastError) {
                                             console.error(chrome.runtime.lastError.message);
                                         }

                                         //debugger;
                                         //console.log('current j', rowIdx);

                                         chrome.tabs.sendMessage(tab.id, {
                                             fromBackground: true,
                                             currentRow: rowIdx,
                                             arrAddr: arrAddr,
                                             currentAddress: currAddr
                                         });

                                         rowIdx++;
                                     });
                                 }

                             ); //end chrome tabs create
                         } else {
                             rowIdx++;
                         }

                     } //end request.startProcessing

                 }else {
                      //create tab with lk-international page
                      chrome.tabs.create({
                          url: "https://ukrposhta.ua/lk-international/"
                      });
                 }

             } catch (e) {

                 console.log("Ошибка при обработке адреса #", rowIdx, arrAddr[rowIdx]);
                 console.log(e.name, e.message);
                 console.log('====================================');
                 return true;
             }
             return true;
             //process next address
         });
 }
