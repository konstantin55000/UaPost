 var count = 8;
 rowIdx = 0;
 arrAddr = [];
 //send to content script
 //сделать проверку на количество меньше 100

 //debugger;

 if (chrome.runtime) {
     chrome.runtime.onMessage.addListener(
         function (request, sender, sendResponse) {

             try {
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
                         //                         console.log('arr Addr', arrAddr);
                         //                         console.log('background j = ', rowIdx);
                         //                         console.log('background currAddr', currAddr);
                         //                         console.log('===================================');
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

                 }

             } catch (e) {

                 console.log("Ошибка при обработке адреса #", rowIdx, arrAddr[rowIdx]);
                 console.log(e.name, e.message);
                 console.log('====================================');
                 return true;
             }
             return true;
             //get j; process next address
         });
 }
