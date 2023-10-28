var express = require('express');
var router = express.Router();
var database = require("../database");

/*
router.get("/sample", function(request, response, next) {
    var query = "SELECT * FROM burrow.tasks";

    database.query(query, function(err, data) {
        if (err) {
            throw error;
        } else {
            // this used to render a view
            response.render("sample_data", { title: "NOde js shit", action: 'list', sampleData: data });
        }
    });
});
*/
router.get("/", function(request, response, next) {

    // 
    var query = "SELECT * FROM burrow.tasks WHERE active = 1 ORDER BY priority DESC";

    database.query(query, function(err, data) {
        if (err) {
            throw error;
        } else {
            // this used to render a view
            response.render("tasklist", { title: "Display The Task List", action: 'list', tasks: data });
        }
    });

});

router.post("/reorder", function(request, response, next) {

    console.log("Reorder to: " + request.body.content);

    var entries = (request.body.content).split(',');
    for (var i = 0; i < entries.length; i++) {
        var taskId = entries[i];
        var priority = (entries.length - 1) - i;

        var query = "UPDATE burrow.tasks SET priority = " + priority + " WHERE burrow.tasks.id = " + taskId + ";\n";
        database.query(query, function(err, data) {
            if (err) {
                throw err;
            }
        });

        console.log("   + " + query);
    }

    response.send('Add Sample Data');

});

router.get("/add", function(request, response, next) {

    response.send('Add Sample Data');

});

module.exports = router;