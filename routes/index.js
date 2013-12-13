
/*
 * GET home page.
 */

var http = require('http');
var dbHelper = require('./dbhelper');

exports.index = function(req, res){
    var callback = function (response) {
        var completeData = '';
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        console.log('BODY: ');
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            completeData += chunk;
            console.log(chunk);
//            chunk = "{\"total_rows\":300,\"offset\":0,\"rows\":["
//            + "{\"id\":\"f108ba2d32d8ffdf54091a9a8fd3da0a\",\"key\":132,\"value\":\"heavenlyrowing\",\"doc\":{\"_id\":\"f108ba2d32d8ffdf54091a9a8fd3da0a\",\"_rev\":\"1-feb6b81f1becce64972e59d67e582022\",\"name\":\"heavenlyrowing\",\"workouts\":[{\"startTime\":1385380976.05,\"endTime\":1385383976.05,\"exercises\":[{\"reps\":16,\"name\":\"exercitiul0\"},{\"reps\":59,\"name\":\"exercitiul1\"},{\"reps\":10,\"name\":\"exercitiul2\"},{\"reps\":22,\"name\":\"exercitiul3\"},{\"reps\":25,\"name\":\"exercitiul4\"}]}]}},"
//            + "{\"id\":\"f108ba2d32d8ffdf54091a9a8fd4fda3\",\"key\":132,\"value\":\"enviousplayer\",\"doc\":{\"_id\":\"f108ba2d32d8ffdf54091a9a8fd4fda3\",\"_rev\":\"1-ba8cdbfa93042b6d67d1a7d97ece2a19\",\"name\":\"enviousplayer\",\"workouts\":[{\"startTime\":1385380976.123,\"endTime\":1385383976.123,\"exercises\":[{\"reps\":2,\"name\":\"exercitiul0\"},{\"reps\":74,\"name\":\"exercitiul1\"},{\"reps\":8,\"name\":\"exercitiul2\"},{\"reps\":1,\"name\":\"exercitiul3\"},{\"reps\":47,\"name\":\"exercitiul4\"}]}]}}]}";
        }).on('end', function() {
                var jsonData = JSON.parse(completeData);
                var rows = jsonData.rows;

//               Se iau datele pentru grafic
                for (var indexRow = 0; indexRow < rows.length; indexRow++) {
                    var docData = rows[indexRow].doc;
                    docData.workoutsChartData = [];
                    for (var indexWorkout = 0; indexWorkout < docData.workouts.length; indexWorkout++) {
                        var currentWorkout = docData.workouts[indexWorkout];
                        if(!currentWorkout) {
                            docData.workoutsChartData.push({x: 0, y: 0});
                            currentWorkout.pieData.push([{label: "n/a", data: 0}]);
                            continue;
                        }

                        var totalReps = 0;
                        var exercises = currentWorkout.exercises;
                        currentWorkout.pieData = [];
                        for (var indexExercise = 0; indexExercise < exercises.length; indexExercise++) {
                            var currentExercise = currentWorkout.exercises[indexExercise];
                            currentWorkout.pieData.push({label: currentExercise.name, data: currentExercise.reps});
                            totalReps += currentExercise.reps;
                        }

                        docData.workoutsChartData.push({
                            x: currentWorkout.endTime,
//                            y: rows[i].doc.workouts[j].exercises[0].reps + rows[i].doc.workouts[j].exercises[1].reps + rows[i].doc.workouts[j].exercises[2].reps +
//                                rows[i].doc.workouts[j].exercises[3].reps + rows[i].doc.workouts[j].exercises[4].reps
                            y: totalReps
                        });

//                        var l = rows[i].doc.workouts.length;
//                        console.log('l ' +l);

                    }

                }
                console.log(docData.workoutsChartData);
                console.log(rows.length);
//                if(undefined != docData.workouts[0])
//                {
//                    console.log(rows[2].doc.workouts[0].startTime);
//                }
//                console.log(jsonObj);
                res.render('index', { title: 'FitnessChallenge', data: rows, length: rows.length});
            }).on('error', function(e) {
                console.log('problem with request: ' + e.message);
            });
    };
    dbHelper.leaderboard(callback);
};