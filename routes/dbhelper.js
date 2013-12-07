var http = require('http');
var async = require('async');

var CloudantConstants = {
    baseUrl : "http://hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com/fitnessathome",
    viewPath : '/_design/views/_view',
    viewUrl : this.baseUrl + this.viewUrl
}

var scores = function (req, res) {
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

var leaderboard = function(callback) {
    http.get(CloudantConstants.baseUrl + '/_design/views/_view/leaderboard?reduce=false&include_docs=true', callback);
}

var voteUp = function(userKey) {
    vote(true, userKey);
}

var voteDown = function(userKey) {
    vote(false, userKey);
}

function vote(up, userKey) {
    async.waterfall([
        function (callback) {
            getUserByKey(userKey, function(user) {
                callback(null, user);
            });
        },

        function(user, callback) {
            if (null == user.votes) {
                user.votes = 0;
            }

            if (true === up) {
                user.votes++;
            } else {
                user.votes--;
            }

            insertInCloudant(user, function(err, result) {
                callback(err, result);
            });
        }
    ], function (err, result) {

    });
}

var getUserByKey = function (key, callback) {
    http.get(CloudantConstants.baseUrl + '/' + key, function (response) {
        var completeData = '';
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
            completeData += chunk;
        }).on('end', function() {
                var json = JSON.parse(completeData);
                console.log(json);
                callback(json);
        }).on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
    });
}

function insertInCloudant(object, cb) {
    // Build the post string from an object
    var post_data = JSON.stringify(object);

    // An object of options to indicate where to post to
    var post_options = {
        host: 'implementer.cloudant.com',
        path: '/fitnessathome',
        auth: "hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        },
        rejectUnauthorized: false
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        var completeResponse = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            completeResponse += chunk;
            console.log('Response: ' + chunk);
        }).on('error',function(e){
                console.log("Error: " + e.message);
                console.log( e.stack );
                cb(e.message, null);
        });
        res.on('end', function() {
            var object = JSON.parse(completeResponse);
            console.log(object);
            cb(null, object);
        });
    }).on('error', function (e) {
            console.log("Error: " + e.message);
            console.log(e.stack);
            cb(e.message, null);
        });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

module.exports = {
    scores: scores,
    leaderboard: leaderboard,
    voteUp : voteUp,
    voteDown : voteDown,
    getUserByKey: getUserByKey
}