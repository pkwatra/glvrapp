var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require("lodash");
var trim = require('trim-character');
var logger = require('@vbrick/vb-logger');
var config = require('config');
var guid = require('guid');
var express = require('express');
var http = require('http');
var app = express();

var versionInfo = require('./version.json');
var version = process.env.npm_package_version;
var buildNumber = versionInfo.buildNumber || "development";
var buildDate = versionInfo.buildDate || new Date();
var sha = versionInfo.sha || "development";
logger.info("Globallogic VR PoC Application service. Version : " + version + " & Build: " + buildNumber + " on " + buildDate + " with SHA: " + sha);

const server = config.get('server');
if (!server.port) {
	server.port = 8085;
}
var appServer;
if (server.httpsEnabled) {
	var https = require('https');
	var privateKey = fs.readFileSync(server.key, 'utf8');
	var certificate = fs.readFileSync(server.certificate, 'utf8');
	var credentials = { key: privateKey, cert: certificate };

	appServer = https.createServer(credentials, app);
	appServer.listen(server.port, function () {
		logger.info("Listening at https://localhost:%s", server.port);
	});
}
else {
	var http = require('http');

	appServer = http.createServer(app);
	appServer.listen(server.port, function () {
		logger.info("Listening at http://localhost:%s", server.port);
	});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/video'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/partials', express.static(__dirname + '/partials'));
app.use('/fonts', express.static(__dirname + '/fonts'));

const users = config.get('users');
const vbSecret = config.get('vbSecret');

app.get('/version*', (request, response) => {
	response.status(200).json({
		sha: sha,
		buildDate: buildDate,
		buildNumber: version + '.' + buildNumber
	});
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + "/" + "index.html");
})



app.post('/login', function (req, res) {
	try {
		var isValidUser = false;
		var validUser = _(users.filter(u => u.username == req.body.username)).first();
		if (validUser != null && validUser != undefined) {
			if (decrypt(validUser.password, vbSecret) === req.body.password) {
				isValidUser = true;
			}
		}
		if (!isValidUser) {
			logger.error("Error occurred in /login - Invalid user: " + req.body.username);
		}
		res.send(isValidUser);
	}
	catch (err) {
		logger.error("Error occurred in /login:" + err);
		res.send(null);
	}
});

app.get('/date-format', function (req, res) {
	res.send(config.get('inputDateFormat'));
})

var crypto = require('crypto'),
    algorithm = 'aes-256-cbc';


function GetKey(password){	
	var key = crypto.pbkdf2Sync(password, config.get('salt'), 1000, 32, "sha1");	
	return key;
}

function encrypt(text, password) {
	var key = GetKey(password);
	var iv = new Buffer(config.get('iv'), "hex");
	var cipher = crypto.createCipheriv(algorithm, key, iv);
	var crypted = cipher.update(text, "utf8", "hex");
	crypted += cipher.final("hex");
	return crypted;
}

function decrypt(text, password) {
	var passwordText = password.toString().replace('T-A-B','\t');
	logger.info(passwordText);
	var key = GetKey(passwordText);
	var iv = new Buffer(config.get('iv'), "hex");
	var decipher = crypto.createDecipheriv(algorithm, key, iv);
	var dec = decipher.update(text, 'hex', 'utf8')
	dec += decipher.final('utf8');	
	return dec;
}