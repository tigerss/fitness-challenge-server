
/*
 * GET users listing.
 */
var http = require('http');

exports.list = function(req, res){

//    var options = {
//        hostname: 'https://implementer:password@implementer.cloudant.com',
//        port: 80,
//        path: '/fitnessathome/_all_docs',
//        method: 'GET'
//    };

    http.get('http://hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com/fitnessathome/_all_docs?include_docs=true',function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            var rows = chunk.rows;
        });

        res.render('users');
    }).on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
};