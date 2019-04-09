var express = require('express');
//var chalk = require('chalk');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var tickets = [
    {
        id: 1,
        created_at: "2015-07-20",
        updated_at: "2016-05-05",
        type: "incident",
        subject: "MFP not working right",
        description: "PC Load Letter? What does that even mean???",
        priority: "med",
        status: "open",
        recipient: "support@selu.edu",
        submitter: "student1@selu.edu",
        assignee_id: 2,
        follower_ids: [3, 4],
        tags: ["enterprise", "printers"]
    },
    {
        id: 2,
        created_at: "2016-01-01",
        updated_at: "2016-01-02",
        type: "incident",
        subject: "Printer problem",
        description: "Printer doesn't print",
        priority: "low",
        status: "open",
        recipient: "support@selu.edu",
        submitter: "student2@selu.edu",
        assignee_id: 3,
        follower_ids: [4, 5],
        tags: ["enterprise", "printers"]
    }
]

//This is the section where it will access an endpoint such as:
//https://desolate-atoll-59781.herokuapp.com/api/test (note /api/test/)

// GET request for all tickets (/rest/list)
router.get('/list', function(req, res) {
    res.contentType('application/json');
    res.status(200).send(JSON.stringify(tickets));
    //res.status(200).send('Hello world');
});

// GET request for a ticket by its id (/rest/list/1)
router.get('/list/:id', function(req, res) {
    res.contentType('application/json');
    var currTicket = tickets.filter(function(ticket) {
        if (ticket.id == req.params.id) { 
            return res.status(200).send(JSON.stringify(tickets[req.params.id - 1])); 
        }
    });
    if (currTicket.length == 1) { 
        return res.status(200).send(JSON.stringify(tickets[0]));
    }
    else {
        res.status(404);
        res.send('Ticket not found');
    }
});

// POST request for creating a new ticket
router.post('/ticket', function(req, res) {
    res.contentType('application/json');
    
    if (!req.body.created_at) {    
        return res.status(400).send('created_at is empty');
    }
    else if (!req.body.updated_at) {
        return res.status(400).send('updated_at is empty');
    }
    else if (!req.body.type) {
        return res.status(400).send('type is empty');
    }
    else if (!req.body.subject) {
        return res.status(400).send('subject is empty');
    }
    else if (!req.body.description) {
        return res.status(400).send('description is empty');
    }
    else if (!req.body.priority) {
        return res.status(400).send('priority is empty');
    }
    else if (!req.body.status) {
        return res.status(400).send('status is empty');
    }
    else if (!req.body.recipient) {
        return res.status(400).send('recipient is empty');
    }
    else if (!req.body.submitter) {
        return res.status(400).send('submitter is empty');
    }
    else if (!req.body.assignee_id) {
        return res.status(400).send('assignee_id is empty');
    }
    else if (!req.body.follower_ids) {
        return res.status(400).send('follower_ids is empty');
    }
    else if (!req.body.tags) {
        return res.status(400).send('tags is empty');
    }

    else {
        var newId = tickets[tickets.length - 1].id + 1;
        tickets.push(
        {
            id: newId,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            type: req.body.type,
            subject: req.body.subject,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            recipient: req.body.recipient,
            submitter: req.body.submitter,
            assignee_id: req.body.assignee_id,
            follower_ids: req.body.follower_ids,
            tags: req.body.tags
        }
        );
        res.status(201).send(JSON.stringify(tickets[newId - 1]));
    }
})

app.use('/rest', router);

app.listen(port, function() {
    console.log("Node app is running at localhost:" + port)
  });