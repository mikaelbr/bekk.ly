var redis = require("redis"),
    client = redis.createClient(),
    sha1 = require('sha1');

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

const USED_HASHES = "usedHashes";


function shortenUrl(url) {
    var hash = createHashFrom(url);
    console.log(hash)
    saveUrlAndHash(url, hash);
    return hash;
}

function getUrl(key, callback) {
  client.get(key, callback);
}

function saveUrlAndHash(url, hash) {
    client.set(hash, url, redis.print);
}

function updateSet(hash) {
    client.sadd(USED_HASHES, hash, redis.print);
}

function isUnique(hash) {
    return client.sismember(USED_HASHES, hash, redis.print);
}

function createHashFrom(url) {
    return sha1(url).substring(5,11);
}

module.exports.shortenUrl = shortenUrl;
module.exports.getUrl = getUrl;

shortenUrl("www.bekk.no/open");


client.quit();
