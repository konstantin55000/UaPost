 
var addShipmentBtn = document.querySelector('.panel-body .pull-right button[data-ng-click="createShipment()"]');

if (addShipmentBtn != null){ 
//      alert(addShipmentBtn);
  addShipmentBtn.click();
  addShipmentBtn.dispatchEvent(new Event('change', { 'bubbles': true }));
}