//main function to be called on submit
function processData() {

    if (!navigator.onLine)
    {
	var firstName = document.querySelector('#datum_name');
	var age = document.querySelector('#datum_age');
	var country = document.querySelector('#datum_country');
	var dataString = firstName.value;
	var dataStringone = age.value;
	var dataStringtwo = country.value;
	saveDataLocally(dataString,dataStringone,dataStringtwo);
    }
}

//called on submit if device is online from processData()
function sendDataToServer(dataString) {
    var orig_data=dataString.split('+');
    var dataName=orig_data[0];
    var dataAge=orig_data[1];
    var dataCountry=orig_data[2];

    var data = {
	commit: "Create Datum",
	datum: {
	    name: dataName,
	    age: dataAge,
	    country: dataCountry
	}
    }
    $.ajax({
	type: "POST",
	url: "/data",
	data: data,
	dataType: "json"
    });
}

//called on submit if device is offline from processData()
function saveDataLocally(dataString,dataStringone,dataStringtwo) {
    
    var timeStamp = new Date();
    timeStamp.getTime();
    var local_data = dataString+"+"+dataStringone+"+"+dataStringtwo;

    try {
	localStorage.setItem(timeStamp, local_data);

    } catch (e) {

	if (e == QUOTA_EXCEEDED_ERR) {
	    console.log('Limit has been exceeded!');
	}
    }

    var length = window.localStorage.length;
    document.querySelector('#local-count').innerHTML = length;
    return false;
}


//called if device goes online or when app is first loaded and device is online
//only sends data to server if locally stored data exists
function sendLocalDataToServer() {
    var status = document.querySelector('#status');
    status.className = 'online';
    status.innerHTML = 'Online';
    var i = 0,
    dataString = '';
    while (i <= window.localStorage.length - 1) {
	dataString = localStorage.key(i);
	if (dataString) {
	    sendDataToServer(localStorage.getItem(dataString));
	    window.localStorage.removeItem(dataString);
	}
	else {
	    i++;
	}
    }
    document.querySelector('#local-count').innerHTML = window.localStorage.length;
    
}

//called when device goes offline
function notifyUserIsOffline() {
    var status = document.querySelector('#status');
    status.className = 'offline';
    status.innerHTML = 'Offline';
}

//called when DOM has fully loaded
function loaded() {

    //update local storage count
    var length = window.localStorage.length;
    document.querySelector('#local-count').innerHTML = length;

    //if online
    if (navigator.onLine) {

	//update connection status
	var status = document.querySelector('#status');
	status.className = 'online';
	status.innerHTML = 'Online';

	//if local data exists, send try post to server
	if (length !== 0) {
	    sendLocalDataToServer();
	}
    }

    //listen for connection changes
    window.addEventListener('online', sendLocalDataToServer, false);
    window.addEventListener('offline', notifyUserIsOffline, false);

    document.querySelector('[type="submit"]').addEventListener('click', processData, false);
}

window.addEventListener('load', loaded, true);