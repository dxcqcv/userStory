var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var mongoose = require('mongoose');
var app = express();

// connect database
mongoose.connect(config.database, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log('connected to the database');
    }
});

// middleware
app.use(bodyParser.urlencoded({ extended:true })); // can parser img, video and string
app.use(bodyParser.json());
app.use(morgan('dev'));

// render all css and js into index.html
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.get('*', function(req,res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
   if(err) {
    console.log(err)
   } else {
    console.log('Listening on port 3000');
   }
});
