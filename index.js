var express = require('express');
var app = express();
var redis = require('./lib/redis');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var fs = require("fs");
app.use(bodyParser.urlencoded());


app.engine('html', exphbs.create({extname: '.html'}).engine);
app.set('view engine', 'html');
app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
    res.render('index', {"body": "register"});
});

app.post('/register', function (req, res) {
    var urlOriginal = req.param('url');
    console.log("Shorten:" + urlOriginal);

    var result = redis.shortenUrl(urlOriginal);
    console.log("Result: " + result);

    res.render('index', {
        "body": "registered",
        "url": req.protocol + '://' + req.get('host') + "/r/" + result,
        "urlOriginal": urlOriginal
    });

});

app.get('/r/:key', function (req, res) {
    var key = req.param("key");
    console.log(key);
    redis.getUrl(key, function (err, result) {
        res.redirect(result);
    });
});

var port = Number(process.env.PORT || 3000);
app.listen(port);