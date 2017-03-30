var express = require('express');
var cors = require('cors')
var app = express();
fs = require('fs');

app.use(cors());

app.get('/peal/api/sso/users', function (req, res) {
	fs.readFile('./pealssousers.json', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		res.status(200).send(data)	
	});
});

app.post('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
