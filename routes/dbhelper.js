var http = require('http');

exports.scores = function (req, res) {
    http.get('http://hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com/fitnessathome/_design/views/_view/sorted_scores?reduce=false&include_docs=true',function (response) {
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
            var rows = chunk.rows;
        });
    }).on('error', function(e) {
            console.log('problem with request: ' + e.message);
    });
};

exports.leaderboard = function(callback) {
    http.get('http://hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com/fitnessathome/_design/views/_view/leaderboard?reduce=false&include_docs=true', callback);
}
