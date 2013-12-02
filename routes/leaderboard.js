var dbHelper = require('./dbhelper');

exports.leaderboard = function(req, res) {
    var completeData = '';
    var callback = function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
            completeData += chunk;
        }).on('end', function() {
            var json = JSON.parse(completeData);
            var rows = json.rows;
            console.log(rows);
        }).on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        res.end();
    };
    dbHelper.leaderboard(callback);
    //res.render('index');
}