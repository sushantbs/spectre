var page = require("webpage").create(),
	fs = require("fs");

var url = phantom.args[0],
	cookieFile = phantom.args[1],
	cookieDomain = phantom.args[2];

phantom.onError = function (msg, trace) {
	console.error(msg);
	phantom.exit();
};

page.onError = function (msg, trace) {
	console.error(msg);
	//phantom.exit();
};

var cookieData = fs.read(cookieFile);
var cookies = cookieData.toString().split("; ");
var i = cookies.length;
var cookieTokens, cookieName, cookieValue;

phantom.clearCookies();

while (i--) {
	cookieTokens = cookies[i].split("=");
	cookieName = cookieTokens[0];
	cookieValue = cookieTokens[1];
	if (cookieTokens[2]) {
		cookieValue += ('=' + cookieTokens[2]);
	}
	phantom.addCookie({
		'name': cookieName,
		'value': cookieValue,
		'domain': cookieDomain
	});
}

var startTime = new Date(),
	timeMap = {};

page.onResourceRequested = function (requestData, networkRequest) {
	if (requestData.url.indexOf("//graph.facebook.com") === -1) {
		timeMap[requestData.id] = new Date();
	}
};

page.onResourceReceived = function(response) {
	if (response.stage === "end" && timeMap[response.id]) {
		var timeNow = timeMap[response.id],
			timeTaken = new Date() - timeNow;

		console.log([startTime.getTime(), response.url, (timeNow - startTime), timeTaken].join(","));
	}
};

//console.log("URL: " + "http://" + url);

// Clear the cache
page.clearMemoryCache();

page.open("http://" + url, function (status) {
	//console.log("Status: " + status);
	setTimeout(function () {
		page.render('snapshot.png');
		phantom.exit();
	}, 20000);
});

