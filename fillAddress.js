//function fillAddressForm() {
//(function() {

//})();

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
//init values
var j = 0;
var currentAddress = null;
window.request = null; //request object on chrome message
var countryList = [
    {
        name: 'Afghanistan',
        code: 'AF'
    },
    {
        name: 'Åland Islands',
        code: 'AX'
    },
    {
        name: 'Abkhazia',
        code: 'AB'
    },
    {
        name: 'Albania',
        code: 'AL'
    },
    {
        name: 'Algeria',
        code: 'DZ'
    },
    {
        name: 'American Samoa',
        code: 'AS'
    },
    {
        name: 'AndorrA',
        code: 'AD'
    },
    {
        name: 'Angola',
        code: 'AO'
    },
    {
        name: 'Anguilla',
        code: 'AI'
    },
    {
        name: 'Antarctica',
        code: 'AQ'
    },
    {
        name: 'Antigua and Barbuda',
        code: 'AG'
    },
    {
        name: 'Argentina',
        code: 'AR'
    },
    {
        name: 'Armenia',
        code: 'AM'
    },
    {
        name: 'Aruba',
        code: 'AW'
    },
    {
        name: 'Australia',
        code: 'AU'
    },
    {
        name: 'Austria',
        code: 'AT'
    },
    {
        name: 'Azerbaijan',
        code: 'AZ'
    },
    {
        name: 'Bahamas',
        code: 'BS'
    },
    {
        name: 'Bahrain',
        code: 'BH'
    },
    {
        name: 'Bangladesh',
        code: 'BD'
    },
    {
        name: 'Barbados',
        code: 'BB'
    },
    {
        name: 'Belarus',
        code: 'BY'
    },
    {
        name: 'Belgium',
        code: 'BE'
    },
    {
        name: 'Belize',
        code: 'BZ'
    },
    {
        name: 'Benin',
        code: 'BJ'
    },
    {
        name: 'Bermuda',
        code: 'BM'
    },
    {
        name: 'Bhutan',
        code: 'BT'
    },
    {
        name: 'Bolivia',
        code: 'BO'
    },
    {
        name: 'Bosnia and Herzegovina',
        code: 'BA'
    },
    {
        name: 'Botswana',
        code: 'BW'
    },
    {
        name: 'Bouvet Island',
        code: 'BV'
    },
    {
        name: 'Brazil',
        code: 'BR'
    },
    {
        name: 'British Indian Ocean Territory',
        code: 'IO'
    },
    {
        name: 'Brunei Darussalam',
        code: 'BN'
    },
    {
        name: 'Bulgaria',
        code: 'BG'
    },
    {
        name: 'Burkina Faso',
        code: 'BF'
    },
    {
        name: 'Burundi',
        code: 'BI'
    },
    {
        name: 'Cambodia',
        code: 'KH'
    },
    {
        name: 'Cameroon',
        code: 'CM'
    },
    {
        name: 'Canada',
        code: 'CA'
    },
    {
        name: 'Cape Verde',
        code: 'CV'
    },
    {
        name: 'Cayman Islands',
        code: 'KY'
    },
    {
        name: 'Central African Republic',
        code: 'CF'
    },
    {
        name: 'Chad',
        code: 'TD'
    },
    {
        name: 'Chile',
        code: 'CL'
    },
    {
        name: 'China',
        code: 'CN'
    },
    {
        name: 'Christmas Island',
        code: 'CX'
    },
    {
        name: 'Cocos (Keeling) Islands',
        code: 'CC'
    },
    {
        name: 'Colombia',
        code: 'CO'
    },
    {
        name: 'Comoros',
        code: 'KM'
    },
    {
        name: 'Congo',
        code: 'CG'
    },
    {
        name: 'Congo, The Democratic Republic of the',
        code: 'CD'
    },
    {
        name: 'Cook Islands',
        code: 'CK'
    },
    {
        name: 'Costa Rica',
        code: 'CR'
    },
    {
        name: 'Cote D\'Ivoire',
        code: 'CI'
    },
    {
        name: 'Croatia',
        code: 'HR'
    },
    {
        name: 'Cuba',
        code: 'CU'
    },
    {
        name: 'Cyprus',
        code: 'CY'
    },
    {
        name: 'Czech Republic',
        code: 'CZ'
    },
    {
        name: 'Denmark',
        code: 'DK'
    },
    {
        name: 'Djibouti',
        code: 'DJ'
    },
    {
        name: 'Dominica',
        code: 'DM'
    },
    {
        name: 'Dominican Republic',
        code: 'DO'
    },
    {
        name: 'Ecuador',
        code: 'EC'
    },
    {
        name: 'Egypt',
        code: 'EG'
    },
    {
        name: 'El Salvador',
        code: 'SV'
    },
    {
        name: 'Equatorial Guinea',
        code: 'GQ'
    },
    {
        name: 'Eritrea',
        code: 'ER'
    },
    {
        name: 'Estonia',
        code: 'EE'
    },
    {
        name: 'Ethiopia',
        code: 'ET'
    },
    {
        name: 'Falkland Islands (Malvinas)',
        code: 'FK'
    },
    {
        name: 'Faroe Islands',
        code: 'FO'
    },
    {
        name: 'Fiji',
        code: 'FJ'
    },
    {
        name: 'Finland',
        code: 'FI'
    },
    {
        name: 'France',
        code: 'FR'
    },
    {
        name: 'French Guiana',
        code: 'GF'
    },
    {
        name: 'French Polynesia',
        code: 'PF'
    },
    {
        name: 'French Southern Territories',
        code: 'TF'
    },
    {
        name: 'Gabon',
        code: 'GA'
    },
    {
        name: 'Gambia',
        code: 'GM'
    },
    {
        name: 'Georgia',
        code: 'GE'
    },
    {
        name: 'Germany',
        code: 'DE'
    },
    {
        name: 'Ghana',
        code: 'GH'
    },
    {
        name: 'Gibraltar',
        code: 'GI'
    },
    {
        name: 'Greece',
        code: 'GR'
    },
    {
        name: 'Greenland',
        code: 'GL'
    },
    {
        name: 'Grenada',
        code: 'GD'
    },
    {
        name: 'Guadeloupe',
        code: 'GP'
    },
    {
        name: 'Guam',
        code: 'GU'
    },
    {
        name: 'Guatemala',
        code: 'GT'
    },
    {
        name: 'Guernsey',
        code: 'GG'
    },
    {
        name: 'Guinea',
        code: 'GN'
    },
    {
        name: 'Guinea-Bissau',
        code: 'GW'
    },
    {
        name: 'Guyana',
        code: 'GY'
    },
    {
        name: 'Haiti',
        code: 'HT'
    },
    {
        name: 'Heard Island and Mcdonald Islands',
        code: 'HM'
    },
    {
        name: 'Holy See (Vatican City State)',
        code: 'VA'
    },
    {
        name: 'Honduras',
        code: 'HN'
    },
    {
        name: 'Hong Kong',
        code: 'HK'
    },
    {
        name: 'Hungary',
        code: 'HU'
    },
    {
        name: 'Iceland',
        code: 'IS'
    },
    {
        name: 'India',
        code: 'IN'
    },
    {
        name: 'Indonesia',
        code: 'ID'
    },
    {
        name: 'Iran, Islamic Republic Of',
        code: 'IR'
    },
    {
        name: 'Iraq',
        code: 'IQ'
    },
    {
        name: 'Ireland',
        code: 'IE'
    },
    {
        name: 'Isle of Man',
        code: 'IM'
    },
    {
        name: 'Israel',
        code: 'IL'
    },
    {
        name: 'Italy',
        code: 'IT'
    },
    {
        name: 'Jamaica',
        code: 'JM'
    },
    {
        name: 'Japan',
        code: 'JP'
    },
    {
        name: 'Jersey',
        code: 'JE'
    },
    {
        name: 'Jordan',
        code: 'JO'
    },
    {
        name: 'Kazakhstan',
        code: 'KZ'
    },
    {
        name: 'Kenya',
        code: 'KE'
    },
    {
        name: 'Kiribati',
        code: 'KI'
    },
    {
        name: 'Korea, Democratic People\'S Republic of',
        code: 'KP'
    },
    {
        name: 'Korea, Republic of',
        code: 'KR'
    },
    {
        name: 'Kuwait',
        code: 'KW'
    },
    {
        name: 'Kyrgyzstan',
        code: 'KG'
    },
    {
        name: 'Lao People\'S Democratic Republic',
        code: 'LA'
    },
    {
        name: 'Latvia',
        code: 'LV'
    },
    {
        name: 'Lebanon',
        code: 'LB'
    },
    {
        name: 'Lesotho',
        code: 'LS'
    },
    {
        name: 'Liberia',
        code: 'LR'
    },
    {
        name: 'Libyan Arab Jamahiriya',
        code: 'LY'
    },
    {
        name: 'Liechtenstein',
        code: 'LI'
    },
    {
        name: 'Lithuania',
        code: 'LT'
    },
    {
        name: 'Luxembourg',
        code: 'LU'
    },
    {
        name: 'Macao',
        code: 'MO'
    },
    {
        name: 'Macedonia, The Former Yugoslav Republic of',
        code: 'MK'
    },
    {
        name: 'Madagascar',
        code: 'MG'
    },
    {
        name: 'Malawi',
        code: 'MW'
    },
    {
        name: 'Malaysia',
        code: 'MY'
    },
    {
        name: 'Maldives',
        code: 'MV'
    },
    {
        name: 'Mali',
        code: 'ML'
    },
    {
        name: 'Malta',
        code: 'MT'
    },
    {
        name: 'Marshall Islands',
        code: 'MH'
    },
    {
        name: 'Martinique',
        code: 'MQ'
    },
    {
        name: 'Mauritania',
        code: 'MR'
    },
    {
        name: 'Mauritius',
        code: 'MU'
    },
    {
        name: 'Mayotte',
        code: 'YT'
    },
    {
        name: 'Mexico',
        code: 'MX'
    },
    {
        name: 'Micronesia, Federated States of',
        code: 'FM'
    },
    {
        name: 'Moldova, Republic of',
        code: 'MD'
    },
    {
        name: 'Monaco',
        code: 'MC'
    },
    {
        name: 'Mongolia',
        code: 'MN'
    },
    {
        name: 'Montserrat',
        code: 'MS'
    },
    {
        name: 'Morocco',
        code: 'MA'
    },
    {
        name: 'Mozambique',
        code: 'MZ'
    },
    {
        name: 'Myanmar',
        code: 'MM'
    },
    {
        name: 'Namibia',
        code: 'NA'
    },
    {
        name: 'Nauru',
        code: 'NR'
    },
    {
        name: 'Nepal',
        code: 'NP'
    },
    {
        name: 'Netherlands',
        code: 'NL'
    },
    {
        name: 'Netherlands Antilles',
        code: 'AN'
    },
    {
        name: 'New Caledonia',
        code: 'NC'
    },
    {
        name: 'New Zealand',
        code: 'NZ'
    },
    {
        name: 'Nicaragua',
        code: 'NI'
    },
    {
        name: 'Niger',
        code: 'NE'
    },
    {
        name: 'Nigeria',
        code: 'NG'
    },
    {
        name: 'Niue',
        code: 'NU'
    },
    {
        name: 'Norfolk Island',
        code: 'NF'
    },
    {
        name: 'Northern Mariana Islands',
        code: 'MP'
    },
    {
        name: 'Norway',
        code: 'NO'
    },
    {
        name: 'Oman',
        code: 'OM'
    },
    {
        name: 'Pakistan',
        code: 'PK'
    },
    {
        name: 'Palau',
        code: 'PW'
    },
    {
        name: 'Palestinian Territory, Occupied',
        code: 'PS'
    },
    {
        name: 'Panama',
        code: 'PA'
    },
    {
        name: 'Papua New Guinea',
        code: 'PG'
    },
    {
        name: 'Paraguay',
        code: 'PY'
    },
    {
        name: 'Peru',
        code: 'PE'
    },
    {
        name: 'Philippines',
        code: 'PH'
    },
    {
        name: 'Pitcairn',
        code: 'PN'
    },
    {
        name: 'Poland',
        code: 'PL'
    },
    {
        name: 'Portugal',
        code: 'PT'
    },
    {
        name: 'Puerto Rico',
        code: 'PR'
    },
    {
        name: 'Qatar',
        code: 'QA'
    },
    {
        name: 'Reunion',
        code: 'RE'
    },
    {
        name: 'Romania',
        code: 'RO'
    },
    {
        name: 'Russian Federation',
        code: 'RU'
    },
    {
        name: 'RWANDA',
        code: 'RW'
    },
    {
        name: 'Saint Helena',
        code: 'SH'
    },
    {
        name: 'Saint Kitts and Nevis',
        code: 'KN'
    },
    {
        name: 'Saint Lucia',
        code: 'LC'
    },
    {
        name: 'Saint Pierre and Miquelon',
        code: 'PM'
    },
    {
        name: 'Saint Vincent and the Grenadines',
        code: 'VC'
    },
    {
        name: 'Samoa',
        code: 'WS'
    },
    {
        name: 'San Marino',
        code: 'SM'
    },
    {
        name: 'Sao Tome and Principe',
        code: 'ST'
    },
    {
        name: 'Saudi Arabia',
        code: 'SA'
    },
    {
        name: 'Senegal',
        code: 'SN'
    },
    {
        name: 'Serbia and Montenegro',
        code: 'CS'
    },
    {
        name: 'Seychelles',
        code: 'SC'
    },
    {
        name: 'Sierra Leone',
        code: 'SL'
    },
    {
        name: 'Singapore',
        code: 'SG'
    },
    {
        name: 'Slovakia',
        code: 'SK'
    },
    {
        name: 'Slovenia',
        code: 'SI'
    },
    {
        name: 'Solomon Islands',
        code: 'SB'
    },
    {
        name: 'Somalia',
        code: 'SO'
    },
    {
        name: 'South Africa',
        code: 'ZA'
    },
    {
        name: 'South Georgia and the South Sandwich Islands',
        code: 'GS'
    },
    {
        name: 'Spain',
        code: 'ES'
    },
    {
        name: 'Sri Lanka',
        code: 'LK'
    },
    {
        name: 'Sudan',
        code: 'SD'
    },
    {
        name: 'Suriname',
        code: 'SR'
    },
    {
        name: 'Svalbard and Jan Mayen',
        code: 'SJ'
    },
    {
        name: 'Swaziland',
        code: 'SZ'
    },
    {
        name: 'Sweden',
        code: 'SE'
    },
    {
        name: 'Switzerland',
        code: 'CH'
    },
    {
        name: 'Syrian Arab Republic',
        code: 'SY'
    },
    {
        name: 'Taiwan, Province of China',
        code: 'TW'
    },
    {
        name: 'Tajikistan',
        code: 'TJ'
    },
    {
        name: 'Tanzania, United Republic of',
        code: 'TZ'
    },
    {
        name: 'Thailand',
        code: 'TH'
    },
    {
        name: 'Timor-Leste',
        code: 'TL'
    },
    {
        name: 'Togo',
        code: 'TG'
    },
    {
        name: 'Tokelau',
        code: 'TK'
    },
    {
        name: 'Tonga',
        code: 'TO'
    },
    {
        name: 'Trinidad and Tobago',
        code: 'TT'
    },
    {
        name: 'Tunisia',
        code: 'TN'
    },
    {
        name: 'Turkey',
        code: 'TR'
    },
    {
        name: 'Turkmenistan',
        code: 'TM'
    },
    {
        name: 'Turks and Caicos Islands',
        code: 'TC'
    },
    {
        name: 'Tuvalu',
        code: 'TV'
    },
    {
        name: 'Uganda',
        code: 'UG'
    },
    {
        name: 'Ukraine',
        code: 'UA'
    },
    {
        name: 'United Arab Emirates',
        code: 'AE'
    },
    {
        name: 'United Kingdom',
        code: 'GB'
    },
    {
        name: 'United States',
        code: 'US'
    },
    {
        name: 'United States Minor Outlying Islands',
        code: 'UM'
    },
    {
        name: 'Uruguay',
        code: 'UY'
    },
    {
        name: 'Uzbekistan',
        code: 'UZ'
    },
    {
        name: 'Vanuatu',
        code: 'VU'
    },
    {
        name: 'Venezuela',
        code: 'VE'
    },
    {
        name: 'Viet Nam',
        code: 'VN'
    },
    {
        name: 'Virgin Islands, British',
        code: 'VG'
    },
    {
        name: 'Virgin Islands, U.S.',
        code: 'VI'
    },
    {
        name: 'Wallis and Futuna',
        code: 'WF'
    },
    {
        name: 'Western Sahara',
        code: 'EH'
    },
    {
        name: 'Yemen',
        code: 'YE'
    },
    {
        name: 'Zambia',
        code: 'ZM'
    },
    {
        name: 'Zimbabwe',
        code: 'ZW'
    }
];

function addEventTouched(elem) {
    elem.dispatchEvent(new Event('change', {
        'bubbles': true
    }));
    elem.dispatchEvent(new Event('touch', {
        'bubbles': true
    }));
}


function submitShipment() {
    setTimeout(function () {
        var submitBtn = document.getElementById('submit-button');
        if (typeof (submitBtn) == 'undefined') {
            return false;
        }
        chrome.runtime.sendMessage({
            rowProcessed: true,
            currentRow: window.request.currentRow,
        }, function (response) {
            //may be added in the future, If needed
            //            if (response.bgProcessed && response.bgProcessed == true) {
            //                window.close();
            //            }

        });
        // addEventTouched(submitBtn);
        submitBtn.click();
        chrome.runtime.sendMessage({closeThis: true});
//        setTimeout(function () {
             //            window.close(); // ok, close the button
             //        }, 50);
    }, 2000);
}

function cleanString(str) {
    // console.log("input  str:::", str);
    //str = str.replace(String.fromCharCode(str.charCodeAt("�")), " ");
    var i = 0;
    while (str.indexOf("�") != -1) {
        str = str.replace("�", " ");
        i++;
        if (i > 40)
            break;
    }
    str = str.trim();
    // console.log("out str", str);
    return str;
}
//get array   and dom element
function insertValue(currentRow, containerText) {
    if (typeof currentRow == 'undefined') {
        console.log("currentRow[0] is not set:", currentRow);
        return;
    } else {

        if (currentRow.length > 1) {
            var str = "";
            for (i = 0; i < currentRow.length; i++) {
                currentRow[i] = currentRow[i].replace(";;", "");
                currentRow[i] = currentRow[i].replace(",,", "");
                str = str + " " + currentRow[i];

            }
            str = cleanString(str);
            containerText.value = str;
        } else if (currentRow.length == 1) {
            var str2 = (currentRow[0]).trim();
            str2 = str2.replace(";;", "");
            str2 = str2.replace(",,", "");
            str2 = cleanString(str2);
            containerText.value = str2;
        } else {
            containerText.value = spaces;
        }
    }
}


var staticData = {
    type: 1,
    brutto: '250',
    length: '35',
    'width': '35',
    'height': '4',
    nameV: 'Wall clock',
    quantity: '1',
    cost: '450',
    parcelItemsValue: '450',
    netto: '200',
    sposob: 1,
    cat: 'GIFT'
};
//Fill static data

//Init fields with __
var spaces = "..";
var zipSpaces = "...";
//var regionText = document.getElementById('region');
var cityText = document.getElementById('city');
var zipText = document.querySelector("input[data-ng-model='shipment.recipient.address.postcode']");
var snameText = document.getElementById('surname');
var nameText = document.getElementById('name');
var appText = document.getElementById("apartment");
var phoneText = document.querySelector("input[data-ng-model='shipment.recipient.phoneNumber']");
var streetText = document.getElementById("street");
var houseText = document.getElementById("house");
var country = '..';
//var length = currentAddress.length;
//country 4 //phone 5
//Set phone number
var phone = "..";


function main() {

    var div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = 0;
    div.style.right = 0;
    div.style.background = "#fff";
    div.style.minHeight = "80px";
    div.style.padding = '15px';
    div.style.border = "1px  solid yellowgreen";
    div.textContent = JSON.stringify(currentAddress) + ' current Address = ' + j;
    //debugger;
    console.log(div.textContent);
    document.body.appendChild(div);

    if (typeof currentAddress[4] !== "undefined") {
        phone = currentAddress[4][0];
        phone = phone.trim();

        if (phone.indexOf("Phone :") != -1) {
            phone = phone.replace("Phone :", "");
            currentAddress[4][0] = phone;
            //console.log('phone', phone);
        }
        phone = cleanString(phone);
        phoneText.value = phone;
        addEventTouched(phoneText);
    }


    //add spaces in unnesessary values



    // appText.value = spaces; !not needed for now
    //regionText.value = spaces;
    // houseText.value = spaces;

    //addEventTouched(appText); !not needed for now

    //addEventTouched(regionText); !not needed for now

    zipText.value = zipSpaces;
    addEventTouched(zipText);
    var currentRow = currentAddress[2];

    insertValue(currentRow, cityText);
    addEventTouched(cityText);

    currentRow = currentAddress[1];
    insertValue(currentRow, streetText);
    addEventTouched(streetText);



    currentRow = currentAddress[0];
    insertValue(currentRow, nameText)
    snameText.value = spaces;
    //emulate client clicks
    addEventTouched(nameText);
    addEventTouched(snameText);

    //check.

    if (typeof currentAddress[3] !== "undefined") {
        country = currentAddress[3][0];
        country = cleanString(country);
        country = country.toLowerCase();
    };
    country = country.trim();
    var countryCode = "";
    var selectCountry = document.getElementById('country');
    selectCountry.options[0].selected = true; //default
    //get value
    for (var i = 0; i < countryList.length; i++) {
        var currCountry = countryList[i];
        if (country == (currCountry.name).toLowerCase() || country == (currCountry.code).toLowerCase()) {
            countryCode = currCountry.code;
            break;
            //console.log("country code", countryCode);
        }
    }


    //if country code not found
    //console.log("!country code", countryCode);

    //check current country, select option.
    if (countryCode == "") {
        selectCountry.options[0].selected = true;
    } else {
        for (var n = 1; n < selectCountry.options.length; n++) {
            var currOption = selectCountry.options[n];
            debugger;
            if (countryCode == currOption.value) {
                currOption.selected = true;
                break;
            }
        }

    }
    addEventTouched(selectCountry);

    //Static additional fields

    var selectType = document.getElementById('packageType');
    selectType.options[3].selected = true;
    addEventTouched(selectType);
    setTimeout(function () {
        // selectType.dispatchEvent(new Event('change', { 'bubbles': true }));
        var selectSposob = document.getElementById('avia');
        selectSposob.options[1].selected = true;
        setTimeout(function () {
            //selectSposob.dispatchEvent(new Event('change', { 'bubbles': true }));
            addEventTouched(selectSposob);


            var quantity = document.getElementById('parcelItemsQuantity');
            quantity.value = staticData.quantity;
            addEventTouched(quantity);
            var parcelItemsValue = document.getElementById('parcelItemsValue');
            parcelItemsValue.value = staticData.parcelItemsValue;
            addEventTouched(parcelItemsValue);
            var parcelItemsWeight = document.getElementById('parcelItemsWeight');
            parcelItemsWeight.value = staticData.netto;
            addEventTouched(parcelItemsWeight);
            var nameV = document.getElementById('parcelItemsName');
            nameV.value = staticData.nameV;
            addEventTouched(nameV);

            var brutto = document.getElementById('weight');
            brutto.value = staticData.brutto;
            addEventTouched(brutto);
            var length = document.getElementById('length');
            length.value = staticData.length;
            addEventTouched(length);
            var width = document.getElementById('width');
            width.value = staticData.width;
            addEventTouched(width);
            var height = document.getElementById('height');
            height.value = staticData.height;
            addEventTouched(height);

            var cost = document.getElementById('declared');
            cost.value = staticData.cost;
            addEventTouched(cost);
            var categoryType = document.getElementById('categoryType');
            categoryType.options[1].selected = true;
            addEventTouched(categoryType);

            //categoryType.dispatchEvent(new Event('change', { 'bubbles': true }));
            submitShipment();
        }, 100);



    }, 400);
}


/* Main function */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log('content script arrAddr', request);

        window.request = request; //set global var request

        //if work values have been passed
        //if (request.currentRow) {
        //if (request.fromBackground == true) {

        currentAddress = request.currentAddress;
        j = request.currentRow;

        console.log('content current Addr', currentAddress);
        console.log('content j', j);

        setTimeout(function () {
            try {
                main();
            } catch (e) {
                alert('Ошибка при обработке адреса #' + j + JSON.stringify(currentAddress));
                //debugger;

                //                                 console.log("Ошибка при обработке адреса #", j, currentAddress);
                //                                console.log(e.name, e.message);
                //                                console.log('====================================');
            }
        }, 200);




        //}
        // }


        //get j; process next address
        return true;
    });
