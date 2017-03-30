var express = require('express');
var cors = require('cors')
var app = express();
var nodemailer = require('nodemailer');
var fs = require('fs');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'iaf.epam@gmail.com',
        pass: 'Epam1234'
    }
});

var mailOptions = {
    from: '"Your friend" <iaf.epam.2@gmail.com>', // sender address
    to: 'iaf.epam@gmail.com', // list of receivers
    subject: 'Verification link', // Subject line
    html: '<b>Please do it</b><a href=\"http://jit-im-upc-de.upc.biz/content?AccountKey=547131&uniqueTokenKey=HIHQHROS&type=21\">link</a>' // html body
};

app.use(cors());

app.get('/url', function(req, res) {
	res.send("<a href=\"http://jit-im-upc-de.upc.biz/content?AccountKey=547131&uniqueTokenKey=HIHQHROS&type=21\">link</a>");
});

app.get('/peal/api/sso/users', function (req, res) {
	fs.readFile('./pealssousers.json', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		res.status(200).send(data)	
	});
});

app.post('/peal/api/sso/users/resendverificationlink', function (req, res) {
	fs.readFile('./resendverificationlink.json', 'utf8', function (err,data) {
		transporter.sendMail(mailOptions, (error, info) => {
    		if (error) {
        		return console.log(error);
    		}
    		console.log('Message %s sent: %s', info.messageId, info.response);
		});
  		if (err) {
    		return console.log(err);
  		}
  		res.status(200).send(data)	
	});
});

app.post('/peal/api/sso/users/activate', function (req, res) {
	fs.readFile('./activate.json', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		res.status(200).send(data)	
	});
});

app.get('/peal/api/sso/users/GENERAL/updateUser', function (req, res) {
	fs.readFile('./updateUsers.json', 'utf8', function (err,data) {
  		if (err) {
    		return console.log(err);
  		}
  		transporter.sendMail(mailOptions, (error, info) => {
    		if (error) {
        		return console.log(error);
    		}
    		console.log('Message %s sent: %s', info.messageId, info.response);
		});
  		res.status(200).send(data)	
	});
});

app.post('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
