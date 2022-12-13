var express = require('express');
var app = express();
var router = require('./router/main')(app);
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());	// json 등록
app.use(bodyParser.urlencoded({ extended : false }));

var server = app.listen(8888, function(){
     host = server.address().address;
     port = server.address().port;
    console.log('listening on 8888')
});

//app.use(express.static('public'));