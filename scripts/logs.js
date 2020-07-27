let checkConnection = require('../scripts/checkConnection.js'); //Require connection tester
let feed = require('../scripts/feed.js'); //Require Logs
let fs = require('fs');
let timeout;
let close;
//Print a message with green, grey, or red to the console
function print(positive, message) {
    if (positive==1) $(`<h4 id="connectSucc" class="logs">${message}</h4>`).appendTo('#reports');
    else if (positive==0) $(`<h4 id="connecting" class="logs">${message}</h4>`).appendTo('#reports');
    else $(`<h4 id="connectFail" class="logs">${message}</h4>`).appendTo('#reports');
}

//Function with interval that periodically polls the logs server
function live(url) {
	let close = false;
	timeout = setInterval(async()=> {
		//Check connection 
		let status = await checkConnection(url);
		if (!status) {
			if (close) return;
			print(-1, "Connection Aborted! Stopping Stream...");
			clearInterval(timeout);
			close = true;
			feed.standard();
			$("#connectBtn").prop('disabled', false);
            $("#ipAddContainer").removeClass("disabled");
            $("#dcBtn").prop('disabled', true);
			return;
		}

		//Get log
		let response = await fetch(url);
		let json = await response.json();
		if (!json.image) return;

		//Find current date
        let dateObj = new Date(Date.now())
        let time = dateObj.toLocaleTimeString();
        let date = dateObj.toDateString();

        //Print to user
        if (json.isMask) {
            logs.print(1, `${date} @ ${time}: A person with face mask was detected. Entry was granted.`);
        }
        else {
            logs.print(-1, `${date} @ ${time}: A person without face mask was detected. Entry was denied.`);
        }

        //Parsing the JSON file into a map using fs.
	    let logPath = './data/logs.json';
	    let logRead = fs.readFileSync(logPath, 'utf8');
	    let logFile = JSON.parse(logRead); //ready for use 
	    let logArr = logFile['logs'];
	    logArr.push({time: time, date: date, isMask: json.isMask, image: json.image});
	    logFile['logs'] = logArr;
	    fs.writeFileSync(logPath, JSON.stringify(logFile, null, 2));
	}, 3000)
}

//Function that stops polling server for logs
function stop() {
	clearInterval(timeout);
	close = true;
}
//Exports
module.exports.print = print;
module.exports.live = live;
module.exports.stop = stop;