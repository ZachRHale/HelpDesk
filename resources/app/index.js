//Express Server
var express = require('express');
var app = express();

//Middleware
const pug = require('pug');
var bodyParser = require('body-parser')
const storage = require('electron-json-storage');
const Guid = require('guid')

app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json() );       

//Setup our static location (aka wwwroot)
app.use(express.static(__dirname + '/public'));
//Set the view engine to do our rendering
app.set('view engine', 'pug')

var Ticket = require('./models/Ticket')

//-------------
//Routing -----
//-------------
app.get('/', function(req, res){
    res.render(__dirname + '/views/index', { title: 'Hey', message: 'Hello there!'})
});

app.get('/create', function(req,res){
    res.render(__dirname + '/views/create', { title: 'Hey', message: 'Hello there!'})
});

app.post('/create', function(req, res){

    var guid = Guid.create()
    var theDate = new Date(req.body.requestDate)
    var DateString = theDate.getMonth()+1 + "/" + theDate.getDate() + "/" + theDate.getFullYear();
    var newTicket = new Ticket(guid,DateString, req.body.requestTitle, req.body.requestDesc);

    storage.set(guid.value, newTicket, function(error) {
        if (error) throw error;
    });
    res.redirect('/')
});

app.get('/alltickets', function(req, res){
    // Read
    storage.getAll(function(error, data) {
        var stuff = data.keys
        console.log(stuff);
        res.render(__dirname + '/views/alltickets', { title: 'Hey', tickets: data})
    }); 
});

app.get('/opentickets', function(req, res){
    storage.getAll(function(error, data) {
        res.render(__dirname + '/views/opentickets', { title: 'Hey', tickets: data})
    }); 
});

app.post('/opentickets', function(req, res){
    console.log(req.body.techName)


    if (typeof req.body.techName == "undefined") {
         storage.get(req.body.ticketId, function(error, data){
            if (error) throw error;

            var theDate = new Date()
            data.completed = true
            data.notes = req.body.completionNotes
            data.completionDate = theDate.getMonth()+1 + "/" + theDate.getDate() + "/" + theDate.getFullYear();
            
            storage.set(req.body.ticketId, data, function(error) {
                if (error) throw error;
            });

        });
    } else if (typeof req.body.techName != "undefined"){
        storage.get(req.body.ticketId, function(error, data){
            if (error) throw error;

            data.assignedTech = req.body.techName
            
            storage.set(req.body.ticketId, data, function(error) {
                if (error) throw error;
            });

        });
    }

    res.redirect('/opentickets')
});


// Listen for incoming HTTP requests
app.listen(3000);