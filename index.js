var express = require('express');
var app = express();
var redis = require('./lib/redis');
var cons = require('consolidate');
var Handlebars = require('handlebars');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

app.engine('html', cons.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  res.render('index');
});

app.post('/register', function(req, res) {
  var urlOriginal = req.param('url');
  console.log(urlOriginal);
  
  res.render('registered', {
    "url":"http://bekk.ly/r/oerijg", 
    "urlOriginal":urlOriginal
  });
});

app.get('/redirect', function(req, res){
  //get url from redis
  //redirect to url
})
var port = Number(process.env.PORT || 3000);
app.listen(port);