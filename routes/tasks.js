var express = require('express');
var router = express.Router();
var database = require("../database");


router.get("/", function(request, response, next) {

    // 
    var query = "SELECT * FROM burrow.tasks WHERE active = 1 ORDER BY priority DESC";

    database.query(query, function(err, data) {
        if (err) {
            throw error;
        } else {
            // this used to render a view
            response.render("task_list", { title: "Display The Task List", action: 'list', tasks: data });
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
    }

    // Everything is ok!
    response.status(200);
});

router.get("/edit", function(request, response, next) {

    // Get the task id
    var taskId = request.query.taskId;

    var query = "SELECT * FROM burrow.tasks WHERE id = " + taskId;

    database.query(query, function(err, data) {
        if (err) {
            throw err;
        } else {
            // this used to render a view
            response.render("task_edit", { task: data[0]});
        }
    });
});

router.get("/create", function(request, response, next) {
    response.render("task_create");
});

router.post("/do_create", function(request, response, next) {

    var query = "INSERT INTO burrow.tasks (name, description) VALUES (\"" + request.body.name + "\", \"" + request.body.description + "\" )";
    console.log(query);

    database.query(query, function(err, data) {
        if (err) {
            throw error;
        } else {
            // Everything is ok!
            response.redirect('/');
            return;
        }
    });


});

module.exports = router;