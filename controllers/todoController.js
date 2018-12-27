var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //used for database handling

//Connect to the database
mongoose.connect('mongodb://test:test123@ds121014.mlab.com:21014/rennie-to-do');

//Create schema - this is  like a blueprint for our data
var todoSchema = new mongoose.Schema({

    item : String

});

var Todo = mongoose.model('Todo', todoSchema) //(model name, parent schema)





var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [{item : 'Get milk'}, {item : 'walk dog'}, {item : 'Become a ninja'}];

module.exports = function(app){



    app.get('/todo', function(req, res){ //request data from server

        //get data from mongodb and pass it to view
        Todo.find({}, function(err, data){//grabs all items if empty or trys to find item specified in param;

            if (err){
                throw err;
            }

            res.render('todo', {todos : data});


        }); 
       

    });



    app.post('/todo',urlencodedParser, function(req, res){ //send data to server
        //get data from the view and add it to mongodb

        var newToDo = Todo(req.body).save(function(err,data){

            if (err){
                throw err;

            }
 
            res.json(data);

        });

       
    });
    
    app.delete('/todo/:item', function(req, res){ //delete data from server 



        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){ //remove passes back updated data

            if (err){
                throw err;
            }

            res.json(data);


        });
     
    });


};