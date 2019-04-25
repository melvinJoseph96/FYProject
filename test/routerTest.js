var request = require('supertest')
const app = require('../app.js')
const chai = require('chai');
const expect = chai.expect;

describe('Database Tests', function() {
    //Before starting the test, create a sandboxed database connection
    //Once a connection is established invoke done()
    before(function (done) {
      mongoose.connect('mongodb://localhost/Users');
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function() {
        console.log('We are connected to database!');
        done();
      });
    });
})
describe("Testing Routing", function(){
    describe("GET /", function(){
        it("welcomes the user initially", function(done){
    
            request(app).get("/")
            
            .expect(/VIDHealth/, done)
        })
        
    })
    
    describe("GET /login", function(){
        it("Sends user to login page", function(done){
    
            request(app).get("/users/login")
            
            .expect(/Login/, done)
        })
        
    })

    describe("GET /interview", function(){
        it("Sends user to interview page", function(done){
    
            request(app).get("/interview")
            
            .expect(/Interview/, done)
        })
        
    })

    describe("GET /register", function(){
        it("Sends user to register page", function(done){
    
            request(app).get("/users/register")
            
            .expect(/Register/, done)
        })
        
    })
    




})



