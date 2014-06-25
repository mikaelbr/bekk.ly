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

    var hash;

    while (! isUnique(hash)) {
        hash = createHashFrom(url);
    }

    saveUrlAndHash(url, hash);
    updateSet(hash);

    return hash;
}

function getUrl(key) {
  client.get(key);
}

function saveUrlAndHash(url, hash) {
    client.set(url, hash, redis.print);
}

function updateSet(hash) {
    client.sadd(USED_HASHES, hash, redis.print);
}

function isUnique(hash) {
    if (hash === undefined) {
        return false;
    } else {
        return client.sismember(USED_HASHES, hash, redis.print);
    }
}

function createHashFrom(url) {
    return sha1(url).substring(5,11);
}

module.exports.shortenUrl = shortenUrl;
module.exports.getUrl = getUrl;

shortenUrl("www.bekk.no/open");


client.quit();
