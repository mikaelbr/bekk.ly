var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/redirect', function(req, res){
  //get url from redis
  //redirect to url
})

app.listen(3000);