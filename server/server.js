var dateformat = require('dateformat');
var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
//controller = require('./controller/appController'),
routes = require('../routes/appRoutes'),
bodyParser = require('body-parser');
var date = new Date();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// serve static files from template
app.use(express.static(__dirname + '/public'));

routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started ' + dateformat(date, "isoDateTime") + ' on: ' + port);
