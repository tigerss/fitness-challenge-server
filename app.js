
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var dbHelper = require('./routes/dbhelper');
var leaderboard = require('./routes/leaderboard');
var signin = require('./routes/signin');
var homeNotSignedIn = require('./routes/homeNotSignedIn');
var homeSignedIn = require('./routes/homeSignedIn');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/signin', signin.list);
app.get('/homeNotSignedIn', homeNotSignedIn.list);
app.get('/homeSignedIn', homeSignedIn.list);
app.get('/leaderboard', leaderboard.leaderboard);
app.post('/test_post', function (req, res) {
    console.log(JSON.stringify(req.body));
    res.end('{"success":"true"}');
});

app.post('/voteup', function(req, res) {
    var userKey = req.body.key;
    dbHelper.voteUp(userKey);
    res.end();
});
app.post('/votedown', function(req, res) {
    var userKey = req.body.key;
    dbHelper.voteUp(userKey);
    res.end();
});
app.get('/user/:key', function(req, res) {
    var key = req.params.key;
    dbHelper.getUserByKey(key, function(user) {
       res.json(user);
    });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
