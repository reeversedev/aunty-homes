var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var index = require('./routes/index');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://reeverse:9560238658@ds159274.mlab.com:59274/aunty-homes');


var port = process.env.PORT || 3000;

var app = express();

// View Engine
app.set('views', path.join(__dirname + '/./views'));
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.listen(port, function() {
    console.log('Server started on port ' + port);
});