
/*
 * GET home page.
 */

var http = require('http');
var dbHelper = require('./dbhelper');

exports.index = function(req, res){
//  http.get('http://hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com/fitnessathome/_design/views/_view/sorted_scores?reduce=false&include_docs=true',
//      function (response) {
//          console.log('STATUS: ' + response.statusCode);
//          console.log('HEADERS: ' + JSON.stringify(response.headers));
//          console.log('BODY: ');
//          response.setEncoding('utf8');
//          response.on('data', function (chunk) {
//              console.log(chunk);
//              var jsonData = JSON.parse(chunk);
//              var rows = jsonData.rows;
//              console.log(rows.length);
//              res.render('index', { title: 'FitnessChallenge', data: rows, length: rows.length});
//
//          });
//      }).on('error', function(e) {
//        console.log('problem with request: ' + e.message);
//    });

    var callback = function (response) {
        var completeData = '';
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            completeData += chunk;
            console.log(chunk);
            completeData += chunk;
//            chunk = "{\"total_rows\":300,\"offset\":0,\"rows\":["
//            + "{\"id\":\"f108ba2d32d8ffdf54091a9a8fd3da0a\",\"key\":132,\"value\":\"heavenlyrowing\",\"doc\":{\"_id\":\"f108ba2d32d8ffdf54091a9a8fd3da0a\",\"_rev\":\"1-feb6b81f1becce64972e59d67e582022\",\"name\":\"heavenlyrowing\",\"workouts\":[{\"startTime\":1385380976.05,\"endTime\":1385383976.05,\"exercises\":[{\"reps\":16,\"name\":\"exercitiul0\"},{\"reps\":59,\"name\":\"exercitiul1\"},{\"reps\":10,\"name\":\"exercitiul2\"},{\"reps\":22,\"name\":\"exercitiul3\"},{\"reps\":25,\"name\":\"exercitiul4\"}]}]}},"
//            + "{\"id\":\"f108ba2d32d8ffdf54091a9a8fd4fda3\",\"key\":132,\"value\":\"enviousplayer\",\"doc\":{\"_id\":\"f108ba2d32d8ffdf54091a9a8fd4fda3\",\"_rev\":\"1-ba8cdbfa93042b6d67d1a7d97ece2a19\",\"name\":\"enviousplayer\",\"workouts\":[{\"startTime\":1385380976.123,\"endTime\":1385383976.123,\"exercises\":[{\"reps\":2,\"name\":\"exercitiul0\"},{\"reps\":74,\"name\":\"exercitiul1\"},{\"reps\":8,\"name\":\"exercitiul2\"},{\"reps\":1,\"name\":\"exercitiul3\"},{\"reps\":47,\"name\":\"exercitiul4\"}]}]}}]}";
        }).on('end', function() {
                var jsonData = JSON.parse(completeData);
                var rows = jsonData.rows;

//               Se iau datele pentru grafic
//                var jsonObj = [];
//                for (var i = 0; i < rows.length; i++) {
//                    for (var j = 0; j < rows[0].doc.workouts.length; j++) {
//                        jsonObj.push({
//                            x: rows[i].doc.workouts[j].endTime,
////                            y: rows[i].doc.workouts[j].exercises[0].reps + rows[i].doc.workouts[j].exercises[1].reps + rows[i].doc.workouts[j].exercises[2].reps +
////                                rows[i].doc.workouts[j].exercises[3].reps + rows[i].doc.workouts[j].exercises[4].reps
//                            y: j
//                        });
//                    }
//                }
//                console.log(jsonObj);
                console.log(rows.length);
                res.render('index', { title: 'FitnessChallenge', data: rows, length: rows.length});
            }).on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
    };
    dbHelper.leaderboard(callback);
};