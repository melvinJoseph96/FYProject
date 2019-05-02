const express = require('express');
var chalk = require('chalk');
var path = require('path');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

const cookieParser = require('cookie-parser')




users =[]; // Total users logged in to application
medicalUsers = []; // Total medical professionals logged in
clients = [] // Total clients logged in
connections = []; // Total socket connections
readyMedics = [] // Total medics who are ready for chat

//Init App
const app = express();
var server = require('http').createServer(app)



//Setting up mongodb

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users',{ useNewUrlParser: true });
mongoose.set('useFindAndModify', false)
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
    resave: true,
    cookie: { maxAge: 600000*4 }

}));

app.use(cookieParser());



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



//Setting up the port
const port = process.env.port || 3000;


    server.listen(port, function () {
    console.log(`listening on port ${chalk.green(port)}`)
});

//socket setup
var io = require('socket.io')(server);



io.on('connection',function(socket){
    console.log(socket.id)
    

    socket.on('hello',function(data,pcld) {
        console.log("data: "+data)  


        socket.broadcast.to(data).emit("offer",socket.id,pcld)

      });

      socket.on("sendice", function(socket_id,candidate){
        console.log("sending ice to medic ") 

        socket.broadcast.to(socket_id).emit("ice",socket.id,candidate)

        


      })
      socket.on("sendice2", function(socket_id,candidate){

        socket.broadcast.to(socket_id).emit("ice2",socket.id,candidate)

        


      })

      socket.on('hello2', function(sock_id, ld){
          console.log("answer: "+sock_id)

        socket.broadcast.to(sock_id).emit("answer",ld)






      })
    
    connections.push(socket.id);    
    // console.log(connections)    
    // console.log(users)
    console.log("medics: "+medicalUsers.length)
        console.log ("clients: "+clients.length)
        console.log ("total users: "+users.length)

    console.log('Connected: %s sockets connected', connections.length);

    const ind = connections.indexOf(socket.id)
    

    




    

    

    socket.on('disconnect', function(){
        var index = connections.indexOf(socket.id)
        var user = users[index]
        if(medicalUsers.includes(user)){
            var medicalIndex = medicalUsers.indexOf(user)
            medicalUsers.splice(medicalIndex,1)
        }else{
            var clientIndex = clients.indexOf(user);
            clients.splice(clientIndex,1)
        }    
        

       
        connections.splice(index,1);       
        users.splice(index, 1);
        
       
        
        // console.log(users)
        console.log("medics: "+medicalUsers.length)
        console.log ("clients: "+clients.length)
        console.log ("total users: "+users.length)
        
        console.log('Disconnected: %s sockets connected', connections.length)
    
    
    })

});

module.exports = server





