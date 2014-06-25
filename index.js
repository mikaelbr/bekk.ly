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
  
  var newUrl= redis.shortenUrl(urlOriginal);
  
  res.render('registered', {
    "url":"http://localhost:3000/r/" + newUrl, 
    "urlOriginal":urlOriginal
  });
});

app.get('/redirect', function(req, res){
  //get url from redis
  //redirect to url
})

app.get('/r/:key', function(req, res) {
  var key = req.param("key");
  var url = redis.getUrl(key);
  res.redirect(url);
});

var port = Number(process.env.PORT || 3000);
app.listen(port);