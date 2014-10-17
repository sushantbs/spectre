var childProcess = require("child_process"),
    fs = require("fs"),
    phantomjs = require("phantomjs"),
    binPath = phantomjs.path;

module.exports = {
    initialize: function (options) {
        console.log("Initialization started");

        var urls = options._,
            count = options.loop || 10,
            totalCount = count,
            outFile = options.out,
            format = options.format || 'CSV',
            cookieFile = options.cookieFile || 'cookies/cookie.txt',
            cookieDomain = options.cookieDomain,
            execCallback = function (error, stdout, stderr) {
                if (stdout) {
                    //console.log(stdout);
                    fs.appendFile(outFile, stdout, function (err) {
                        if (err) {
                            throw err;
                        }
                    });

                    if (count--) {
                        console.log("Run count... " + (totalCount - count));
                        childProcess.exec([binPath, "scripts/run.js", urls[0], cookieFile, cookieDomain].join(" "), execCallback);
                    }
                    else {
                        console.log("Execution completed - Report stored in " + outFile);
                    }
                }

                if (stderr) {
                    console.log("ERROR: " + stderr);
                }

                if (error !== null) {
                  console.log('EXEC ERROR: ' + error);
                }
            };

        var exists = fs.existsSync(outFile);
        if (!exists) {
            fs.writeFileSync(outFile, "Page Load Time,Resource URL,Requested After,Response Time\n");
        }

        if (urls.length) {
            console.log("URL: " + urls[0]);
            console.log("Repeat: " + count || 1);
            console.log("Cookie File: " + cookieFile);
            console.log("Cookie Domain: " + cookieDomain);

            if (count--) {
                console.log("Run count... " + (totalCount - count));
                childProcess.exec([binPath, "scripts/run.js", urls[0], cookieFile, cookieDomain].join(" "), execCallback);
            }
        }
        else {
            // Throw error
            console.log("URL not specified!");
        }
    }
};