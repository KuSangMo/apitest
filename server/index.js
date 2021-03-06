var express = require('express');
var ejs = require('ejs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//LOAD THE CONFIG
var config = require('../config/server.config');

//CONNECT TO MONGOOSE
var db = mongoose.connection;
db.on('error',console.error);
db.once('open', function(){
  console.log('Connected to mongdb server');
});

mongoose.connect(config.mongodbUri);

//DEFINE MODEL
var Userdb = require('../models/user');

// disable view-caching
app.disable('view cache');

// config template engine
app.set('views', path.join(__dirname, '../client/templates'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// serve static files
app.use(express.static('public'));


//parse json
app.use(bodyParser.json());//
app.use(bodyParser.urlencoded({extended:true}));//for parsing


// routes
app.use('/api',require('./api'));
app.use('/', require('./www'));





app.listen(3000, function () {
  console.log('rest api server listening on port 3000!');
});