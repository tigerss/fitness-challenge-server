var dbHelper = require('./dbhelper');

exports.leaderboard = function(req, res) {
    var callback = function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
            var rows = chunk.rows;
        });
        res.end();
    };
//    .on('error', function(e) {
//        console.log('problem with request: ' + e.message);
//    });
    dbHelper.leaderboard(callback);
    //res.render('index');
}