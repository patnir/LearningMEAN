var request = require("request");

var apiCall = "https://www.khanacademy.org/api/v1/playlists"

request(apiCall, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        var parsedData = JSON.parse(body);
        console.log(parsedData);
        //console.log(parsedData["query"]["results"]["channel"]["astronomy"]["sunset"]);
    }
});

