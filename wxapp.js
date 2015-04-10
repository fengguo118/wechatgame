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

var config  = require('')