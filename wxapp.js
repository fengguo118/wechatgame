/*
* This is web application main app
* author:James Guo
* date:2015/4/10
*/

/*this is require head*/

var express = require('express');
var app     = express();

var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var mysql    = require('mysql');
var path     = require('path');

var config  = require('./lib/config.js').config;

// console.log(config.mysql);


/*
 * 中间件使用
 */

 app.use(bodyparser.urlencoded({extended:false}));
 app.use(bodyparser.json());
 app.use(cookieparser());
 app.use(express.static(__dirname + '/static'));

/*如下是mysql的链接信息*/

var mysqlConnect = mysql.createConnection(config.mysql);
mysqlConnect.connect();

var errorFunction = function(error){
	if (!error.fatal){
		return;
	}

	if ((error.code !== 'PROTOCOL_CONNECTION_LOST') && (error.code !== 'ECONNREFUSED')) {
		throw error;
	};

	setTimeout(function(){
		mysqlConnect.connect();
	}, 1000);
}

mysqlConnect.on('error', function(error){
	return errorFunction();
});

var keepConnected = function(){
	setInterval(function(){
		mysqlConnect.query("SELECT 1", function(error){
			if (error) {
				mysqlConnect = mysql.createConnection(config.mysql);
				mysqlConnect.connect();
				mysqlConnect.on('error', function(error){
					return errorFunction(error);
				});
			};
		});
	}, 600 * 1000);
}

keepConnected();

/*service api*/
app.post('/shake', function(req, res){
	console.log(req.body);
    return res.send({"dat":"ks"});
});

/*启动server*/

app.listen(8080);

console.log("server is starting !");