var express = require('express');
var app = express();
var mongojs = require('mongojs');
//var db = mongojs('192.168.9.29/workerlog', ['workerlog']); // dostep z zewnatrz
var ip = require('ip');
var db = mongojs('workerlog', ['workerlog']);
var bodyParser = require('body-parser');
var socketio = require('socket.io');
var requestIp = require('request-ip');
var moment = require('moment');

app.use(requestIp.mw());


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/workerlog', function (req, res) {

	console.log("Recived a GET request")
	db.workerlog.find(function (err, docs){
		console.log("Date recived successfully");
		res.json(docs);
	})
});

app.post('/workerlog', function(req, res) {
	var ip = req.clientIp;
	if (ip.length < 15) {ip=ip;} 
	else {var newIp = ip.slice(7); ip = newIp;}
	var time = moment().format('HH:mm:ss');
	var date = moment().format('DD.MM.YYYY');
	req.body.Name = ip;
	req.body.Time_on = time;
	req.body.Date = date;
	console.log(req.body);
	db.workerlog.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/workerlog/:id', function (req, res) {
	var id = req.params.id;
	console.log('User deleted with id =');
	console.log(id);
	db.workerlog.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/workerlog/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.workerlog.findOne({_id: mongojs.ObjectId(id), Time_off: {$exists: false}}, function (err,doc) {
		res.json(doc);
		console.log(doc);
	});
});
app.put('/workerlog/:id', function(req, res) {
	var id = req.params.id;
	console.log('edited successfully');
	var timeoff = moment().format('HH:mm:ss');
	db.workerlog.update({_id: mongojs.ObjectId(id)},
		{$set: {Time_off: timeoff}});
});


app.listen(3000);
console.log("Server running on port 3000");