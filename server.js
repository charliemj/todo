//setup
var express = require("express");
var app = express(); // create our app w/ express
var mongoose = require("mongoose");
var morgan = require("morgan");  //HTTP request logger middleware for node.js
var bodyParser = require("body-parser"); // pull information from HTML POST (express4)
var methodOverride = require("method-override"); // simulate DELETE and PUT (express4)

// configuration

mongoose.connect("mongodb://localhost/todoapp4");

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride());


//model

var Todo = mongoose.model("Todo",{
    text:String,
    time: String,
    done: Boolean
});


// routes

//GET all todos

app.get('/api/todos', function(req,res){

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos){
        // if there is an error retrieving, send the error. nothing after res.send(err) will exec
        if (err){
            res.send(err);
        }//end if

        else{
        // get and return all the todos after you create another
            Todo.find({done:false},function(err,todos){
                if (err){
                    res.send(err);
                }//end if
                else{
                    Todo.find({done:true},function(err,dones){
                        if (err){
                            res.send(err);
                        }//end if
                        else if (dones.length >0){
                        res.json([todos,dones]); 
                        }//end else if
                        else{
                            res.json([todos]);
                        }
                    });
                }//end else
            });
        }//end else
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req,res){
    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text: req.body.text,
        time: req.body.time,
        done : false
    }, function(err, todo){
        if (err){
            res.send(err);
        }//end if
        else{
        // get and return all the todos after you create another
            Todo.find({done:false},function(err,todos){
                if (err){
                    res.send(err);
                }//end if
                else{
                    Todo.find({done:true},function(err,dones){
                        if (err){
                            res.send(err);
                        }//end if
                        else if (dones.length >0){
                        res.json([todos,dones]); 
                        }//end else if
                        else{
                            res.json([todos]);
                        }
                    });
                }//end else
            });
        }//end else
    });
});

//"delete" a todo

app.put("/api/todos/:todo_id",function(req,res){
    Todo.update({_id : req.params.todo_id}, {done:true},
        function(err, todo){
        if (err){
            res.send(err);
        }//end if
        else{
            // get and return all the todos after you create another
            Todo.find({done:false},function(err,todos){
                if (err){
                    res.send(err);
                }//end if
                else{

                    Todo.find({done:true},function(err,dones){
                        if (err){
                            res.send(err);
                        }//end if
                        else if (dones.length >0){
                        res.json([todos,dones]);
                        }//end else if 
                        else{
                            res.json([todos]);
                        }
                    });
                }//end else
            });
        } //end else
    });
});

// actually delete a todo (once it is done)
app.delete('/api/todos/:todo_id', function(req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err){
                res.send(err);
            }
            // get and return all the todos after you create another
            else{
                Todo.find({done:true},function(err, dones) {
                    if (err){
                        res.send(err)
                    }
                    else{
                    res.json(dones);
                    }
                });
            }
        });
    });

// application **Important to define this after the API routes that are above (otherwise weird errors)**


app.get("",function(req,res){ //the tutorial said "*" but I changed to ""
    // load the single view file (angular will handle the page changes on the front-end)
    res.sendfile("./public/index.html"); 
});

// listen (start app with node server.js)

app.listen(8080);
console.log("App listening on port 8080");

