var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

const s = "usedHashes";


function shortenUrl(url) {

    var hash;

    while (! isUnique(hash)) {
        hash = createHashFrom(url);
    }

    saveUrlAndHash(url, hash);
    updateSet(hash);

    return hash;
}

function saveUrlAndHash(url, hash) {
    client.set(url, hash, redis.print);
}

function updateSet(hash) {
    client.sadd(s, hash, redis.print);
}

function isUnique(hash) {
    if (hash === undefined) {
        return false;
    } else {
        return true
    }
}

function createHashFrom(url) {
    return "tullOgToys";
}

shortenUrl("www.bekk.no/open");

client.set("string key", "string val", redis.print);
client.hset("hash key", "hashtest 1", "some value", redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});