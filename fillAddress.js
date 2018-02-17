//function fillAddressForm() {
//(function() {

//})();

function addEventTouched(elem){
      elem.dispatchEvent(new Event('change', { 'bubbles': true }));
      elem.dispatchEvent(new Event('touch', { 'bubbles': true })); 
}

 
 function submitShipment(){
    setTimeout(function(){ 
         var submitBtn = document.getElementById('submit-button');
         if (typeof(submitBtn) === 'undefined'){
             alert('Кнопка зберегти не знайдена!')
             return;
         }
        // addEventTouched(submitBtn);
         console.log('sumit btn', submitBtn);
         console.log('**', submitBtn.click()); 
      }, 4000);
}
  
//get array   and dom element
function insertValue(currentRow, containerText) {
    if (typeof currentRow == undefined){
   console.log ("currentAddress[2]", currentAddress[2]); return;
}else {
     if (currentRow.length > 1) { 
               var str = ""; 
               for (i = 0; i < currentRow.length; i++){ 
                        currentRow[i] = currentRow[i].replace(";;", "");
                   currentRow[i] = currentRow[i].replace(",,", "");
                       str  = str + " " + currentRow[i];
                     
               }
               containerText.value = str;
           } 
    else if  (currentRow.length  == 1) { 
                currentRow[0] = currentRow[0].replace(";;", "");
                currentRow[0] = currentRow[0].replace(",,", "");
              containerText.value = currentRow[0]; 
    }
    else {
            containerText.value = spaces;   
    } 
}
} 

    
    var staticData = {type:1, brutto: '250', length: '35', 
                     'width':'35', 'height': '4', nameV: 'Wall clock', quantity: '1', cost: '450', parcelItemsValue: '450', netto: '200', sposob: 1, cat: 'GIFT' }; 

    
        console.log('inside filladdress', currentAddress);
    //Debug Info

    var div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = 0;
	div.style.right = 0;
    div.style.background = "#fff";
    div.style.minHeight = "80px";
    div.style.padding = '15px';
    div.style.border = "1px  solid yellowgreen"; 
    div.textContent = JSON.stringify(currentAddress)+ ' current Address = '+j;
    document.body.appendChild(div); 
    //Fill static data
        var selectType = document.getElementById('packageType');
        selectType.options[1].selected = true; 
        addEventTouched(selectType);
       // selectType.dispatchEvent(new Event('change', { 'bubbles': true }));
    var selectSposob = document.getElementById('avia');
    selectSposob.options[1].selected = true; 
    setTimeout(function(){ 
        
       
        //selectSposob.dispatchEvent(new Event('change', { 'bubbles': true }));
        addEventTouched(selectSposob);
        
            
            var quantity =  document.getElementById('parcelItemsQuantity');
            quantity.value = staticData.quantity;
            addEventTouched(quantity);
            var parcelItemsValue =  document.getElementById('parcelItemsValue');
            parcelItemsValue.value = staticData.parcelItemsValue; 
            addEventTouched(parcelItemsValue);
            var parcelItemsWeight =  document.getElementById('parcelItemsWeight');
            parcelItemsWeight.value = staticData.netto; 
            addEventTouched(parcelItemsWeight);
            var nameV =  document.getElementById('parcelItemsName');
            nameV.value = staticData.nameV;
            addEventTouched(nameV);
        
        var brutto =  document.getElementById('weight');
        brutto.value = staticData.brutto;
        addEventTouched(brutto);
        var length =  document.getElementById('length');
        length.value = staticData.length;
        addEventTouched(length);
        var width =  document.getElementById('width');
        width.value = staticData.width;
        addEventTouched(width);
        var height =  document.getElementById('height');
        height.value = staticData.height;
        addEventTouched(height);
        var cost =  document.getElementById('declared');
        cost.value = staticData.cost;
        addEventTouched(cost);
        var categoryType = document.getElementById('categoryType');
        categoryType.options[1].selected = true;
        addEventTouched(categoryType);
        
        //categoryType.dispatchEvent(new Event('change', { 'bubbles': true })); 
        // submitShipment();
       
    }, 600);
 
var country = '..';
var phone = '..';
var length = currentAddress.length;
 
//Check country or phone
var check = currentAddress[length - 1][0];
check = check.trim();
console.log('check country or phone', check);
if (check.indexOf("Phone :") != -1){
   check = check.replace("Phone :", "");
   currentAddress[length - 1][0] = check;
   phone = check;
   //console.log('phone', check);
   // alert(phone);
} 
var isCountry = /^(\s?\.?[a-zA-Z]+)+$/.test(check);
var regexHasDigit = /\d/;
if (isCountry){
    country = check; 
} else {
    phone = check; 
    country = currentAddress[length - 2][0]; 
}  
  
  
 
 
country = country.toLowerCase();
console.log('country', country);


//Init fields with __
var spaces = "..";
var zipSpaces = "...";
var regionText = document.getElementById('region');
var cityText = document.getElementById('city'); 
var zipText = document.querySelector("input[data-ng-model='shipment.recipient.address.postcode']");
var snameText = document.getElementById('surname');
var nameText = document.getElementById('name');
var appText =  document.getElementById("apartment"); 
var phoneText = document.querySelector("input[data-ng-model='shipment.recipient.phoneNumber']");
var streetText =  document.getElementById("street"); 
var houseText =  document.getElementById("house"); 
//add spaces in unnesessary values
 phoneText.value = phone;  
// appText.value = spaces;
 regionText.value = spaces;
 houseText.value = spaces;
   
addEventTouched(appText);
addEventTouched(phoneText); 
addEventTouched(regionText);
//nameText.value = spaces;
//snameText.value = spaces;
//regionText.value = spaces;
//cityText.value = spaces;
zipText.value = zipSpaces;
addEventTouched(zipText);
var currentRow  = currentAddress[2]; 

insertValue(currentRow, cityText); 
addEventTouched(cityText);

currentRow  = currentAddress[1]; 
insertValue(currentRow, streetText);
addEventTouched(streetText);

 

currentRow = currentAddress[0];
insertValue(currentRow, nameText)
snameText.value = spaces;
//emulate client clicks
addEventTouched(nameText);
addEventTouched(snameText); 
        

//heck current country, select option.
 var selectCountry = document.getElementById('country');
 //selectCountry.options[197].selected = true; 
   //country get and check 
  if (country.indexOf("us") !=-1 || country.indexOf("states") != -1 || country.indexOf("u.s")!=-1){
    selectCountry.options[197].selected = true; 
}
else if (country.indexOf("germany") != -1 || country.indexOf("deutschland") != -1){
    selectCountry.options[144].selected = true; 
}else if (country.indexOf("portugal") != -1 || country.indexOf("portugal") != -1){
    selectCountry.options[168].selected = true; 
}
else if (country.indexOf("kingdom") != -1 || country.indexOf("britain") != -1){
    selectCountry.options[38].selected = true; 
}else if (country.indexOf("mexico") != -1 || country.indexOf("mexica") != -1){
     selectCountry.options[131].selected = true;  
} else if (country.indexOf("japan") != -1 || country.indexOf("日本") != -1){
    selectCountry.options[236].selected = true; 
} 
else if (country.indexOf("canada") != -1){
    selectCountry.options[90].selected = true; 
}
 
 addEventTouched(selectCountry);
                  
 //selectCountry.dispatchEvent(new Event('change', { 'bubbles': true }));
  
 
    //GET last idx if digit: phone
    //else country
    //console.log('inside timeout', j, arrayAddr);
    //Debug Data:

     //define arrayAddr
      
     