var http = require('https');
var fs = require('fs');

var usernames = new Array();
fs.readFileSync('usernames.txt').toString().split(/\r?\n/).forEach(function(line){
    usernames.push(line);
});

function insertInCloudant(object) {
    // Build the post string from an object
    var post_data = JSON.stringify(object);

    // An object of options to indicate where to post to
    var post_options = {
//        host: 'hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK@implementer.cloudant.com',
        host: 'implementer.cloudant.com',
        path: '/fitnessathome',
        auth: "hendeptycleystordifteric:3WUW8OoJhRVboQjXuBeHmiuK",
//        host: 'localhost',
//        path: '/test_post',
//        port: '443',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        },
//        agent: true,
        rejectUnauthorized: false
    };
//    post_options.agent = new http.Agent(post_options);

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        }).on('error',function(e){
                console.log("Error: " + e.message);
                console.log( e.stack );
            });
    }).on('error',function(e){
            console.log("Error: " + e.message);
            console.log( e.stack );
        });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

for (var userIndex in usernames) {
    var fitnessUser = new Object();
    fitnessUser.name = usernames[userIndex];
    fitnessUser.workouts = new Array();
    for (var index = 0; index < 5; index++) {
        var workout = new Object();
        var startTime = (new Date() / 1000) + index * 10000;
        var endTime = startTime + 3000;
        workout.startTime = startTime;
        workout.endTime = endTime;
        workout.exercises = new Array();
        for (var indexExercise = 0; indexExercise < 5; indexExercise++) {
            var exercise = new Object();
            var reps = Math.floor((Math.random()*100)+1);
            exercise.reps = reps;
            exercise.name = 'exercitiul' + indexExercise;
            workout.exercises.push(exercise);
        }

        fitnessUser.workouts.push(workout);
    }
    insertInCloudant(fitnessUser);
}
