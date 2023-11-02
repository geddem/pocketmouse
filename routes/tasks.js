var express = require('express');
var router = express.Router();
var database = require("../database");

///
/// View Tasks
///
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


///
/// View Archive
///
router.get("/archive", function(request, response, next) {

    // Query the DB
    var query = "SELECT * FROM burrow.tasks WHERE active = 0 ORDER BY priority DESC";

    database.query(query, function(err, data) {
        if (err) {
            throw error;
        } else {
            // this used to render a view
            response.render("task_archive", { tasks: data });
        }
    });
});

router.get("/do_archive", function(request, response, next) {

    // Get the task id
    taskId = request.query.taskId;
    value = request.query.value =="true"?0:1;
    console.log("Archiving : " + taskId);

    var query = "UPDATE burrow.tasks SET active = " + value + " WHERE burrow.tasks.id = " + taskId + ";\n";

    database.query(query, function(err, data) 
    {
        if (err) 
        {
            throw err;
        }
        else
        {
            if(value==0)
            {
                // Go back to the archive
                response.redirect('/archive');
            }
            else
            {
                // Go to the task list
                response.redirect('/');
            }

            return;
        }
    });
});

router.get("/do_delete", function(request, response, next) {

    taskId = request.query.taskId;
    var query = "DELETE FROM burrow.tasks WHERE burrow.tasks.id = " + taskId + ";\n";

    database.query(query, function(err, data) {
        if (err) {
            throw err;
        } else {
            // Go to the task list
            response.redirect('/');
        }
    });
});



///
/// Edit Task
///
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

router.post("/do_edit", function(request, response, next) {

    //console.log("BLOB data " + request.body.content);

    var taskId = request.body.taskId;
    var name = request.body.name;
    var icon = request.body.icon;
    //var content = request.body.content;
    const content = new Buffer.from(request.body.content);

    var query = "UPDATE burrow.tasks SET name = (?), icon = (?), burrow.tasks.content = (?) WHERE burrow.tasks.id = " +taskId;
    database.query(query, [name, icon, content], function(err, data)
    {
        if (err) throw err;
        response.redirect('/');
    });
});

router.get("/create", function(request, response, next) {
    response.render("task_create");
});

router.post("/do_create", function(request, response, next) {

    //var query = "INSERT INTO burrow.tasks (name, icon, content) VALUES (\"" + request.body.name + "\", \"" + request.body.description + "\" )";
    var query = "INSERT INTO burrow.tasks (name, icon, burrow.tasks.content) VALUES ( ?, ?, ? )";
    //var query = "INSERT INTO burrow.tasks (burrow.tasks.name, burrow.tasks.icon) VALUES ( ?, ? )";

    var name = request.body.name.toString();
    var icon = request.body.icon;
    var content = request.body.content;    

    //database.query(query [name, icon, content], function(err, data) {
    database.query(query, [name, icon, content], function(err, data) 
    {
        if (err) {
            throw err;
        } else {
            // Everything is ok!
            response.redirect('/');
            return;
        }
    });

});

module.exports = router;