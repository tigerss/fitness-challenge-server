var http = require('http');
var dbHelper = require('../routes/dbhelper');

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
            var bulkDocs = new Object();
            bulkDocs.docs = new Array();
            var json = JSON.parse(completeData);
            var rows = json.rows;
            for (var row in rows) {
                var docToBeDeleted = new Object();
                var rowData = rows[row];
                if (null != rowData.doc['artificial']) {
                    var documentId = rowData.doc['_id'];
                    var rev = rowData.doc['_rev'];
                    docToBeDeleted['_id'] = documentId;
                    docToBeDeleted['_rev'] = rev;
                    docToBeDeleted['_deleted'] = true;
                    bulkDocs.docs.push(docToBeDeleted);
                }
            }
            console.log(bulkDocs);
            deleteDocuments(bulkDocs);

    }).on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
};
dbHelper.leaderboard(callback);

var deleteDocuments = function (object) {
    var post_data = JSON.stringify(object);

    // An object of options to indicate where to post to
    var post_options = {
        host: 'implementer.cloudant.com',
        path: '/fitnessathome/_bulk_docs',
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
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        }).on('end', function() {
            console.log('Finished')
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
