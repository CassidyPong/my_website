
var express = require('express');
var compress = require('compression');
var app = express();
app.use(compress());
app.env = app.get('env');

if (process.env.USE_HTTP == 'yes' || app.env == 'development')
	app.USE_HTTPS = false;
else
	app.USE_HTTPS = true;

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var  moment= require('moment');
var _ = require("underscore");
var json2xls = require('json2xls');
var cacheTime = 86400000*7;     // 7 days
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.locals._ = _;
app.locals.moment =moment;
//app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(json2xls.middleware);
//if (process.env.PORT != 80 && process.env.PORT != 443)
if (app.env == 'development' || !app.USE_HTTPS)
	app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.disable('x-powered-by');

// Test page: Check current server enviroment

app.get('/env', function(req, res) {
	var answer = 'NO';
	if ('development' == app.env)
		answer = 'YES';

	res.send(' env var = ' + app.env + '<br> Is development ? ' + answer + '<br> PORT: ' + process.env.PORT + 
		'<br> app.USE_HTTPS = ' + app.USE_HTTPS);
}); 

// middle ware handler...
/*
app.use(function(req, res, next) {

	if (app.USE_HTTPS) {
		if (req.headers['x-forwarded-proto'] !== 'https') {    
			return res.redirect(['https://', req.get('Host'), req.url].join(''));
		}
	}

	next();    
});*/

//
// We don't dynamically load controllers.
// The order of url handlers matters.
// "/api/*" will be handled first
// "/manager/*" will be handled next
// "/*" are the lowest priority
//

//var index = require('./controllers/index');
//index.controller(app);

app.use(express.static(path.join(__dirname, 'public')));

/*
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.render('error404', {title: '404: File Not Found'});
	//next(err);
});

/// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	if ('development' == app.env) {
		// development error handler
		// will print stacktrace
console.log(err.message);
		res.render('error', {
			message: err.message,
			error: err
		});
	} else
		res.render('error500', {title: '500:  Internal server error'});	
});
*/

module.exports = app;
