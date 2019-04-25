const express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const expressLayouts = require('express-ejs-layouts');
var ebs = require('express-handlebars');
var session = require('express-session');
var LocalStrategy = require('passport-local');
var passport = require('passport');
var flash = require('connect-flash');
var socket = require('socket.io');
const request = require("request");
const axios = require('axios');

users =[];
connections = [];

//Init App
const app = express();



//Setting up mongodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));




//Settng static folders
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/css')));

//Setting view engine
app.set('views', './views');
app.use(expressLayouts);
app.set('view engine', 'ejs'); 

// Passport Config
require('./config/passport')(passport);




//BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//handle sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true

}));



//Validator
app.use(expressValidator({
    expressFormatter: function(param,msg,value){
        var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam+='['+ namespace.shift()+']';
        }
        return {
            param: formParam,
            msg :msg,
            value: value
        };
    }    
}));

//Connect flash
app.use(flash());

//Global vars
app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Passport 
app.use(passport.initialize());
app.use(passport.session());

//Express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
})



// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//socket setup
var io = socket(server);
io.on('connection',function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    

    socket.on('disconnect', function(){
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets connected', connections.length)
    
    
    })

});

//Setting up the port
const port = process.env.port || 3000;


var server = app.listen(port, function () {
    console.log(`listening on port ${chalk.green(port)}`)
});




module.exports = server





