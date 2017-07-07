var Ticket = function(requestDate, requestDesc){
    this.requestDate = requestDate
    this.requestDesc = requestDesc
    this.assignedTech = null
    this.completionDate = null 
    this.notes = []
    this.completed = false

    this.completeTicket = function(assignedTech, completionDate, notes){
        this.assignedTech = assignedTech
        this.completionDate = completionDate 
        this.notes = notes
        this.completed = true
    }
}

var express = require('express');
var app = express();
const pug = require('pug');

app.set('view engine', 'pug')

app.use(express.static(__dirname + 'public'));

app.get('/', function(req, res){
    var hello = [new Ticket(Date.now(), "get stuff done"), new Ticket(Date.now(), "do something else"), new Ticket(Date.now(), "whatever you want")]
    res.render('index', { title: 'Hey', message: 'Hello there!', 'stuff': hello})
});

app.get('/example', function(req,res){
    var aTicket = new Ticket(Date.now(), "A new ticket")
    var json = JSON.stringify(new Ticket(""))
    res.send(json)
})

app.listen(3000);