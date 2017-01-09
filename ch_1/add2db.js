var _ = require("underscore");
var mongodb = require("mongodb");

var uri = "mongodb://localhost:27017/example";

mongodb.MongoClient.connect(uri, function(err, db){
    if(err){
        console.log(err);
        process.exit(1);
    }

    var i = 0;
    _.each(process.argv, function(val){
        if(i == 0 || i == 1) i++;
        else {
            var doc = {};
            doc["key_" + i++] = val;
            db.collection("sample").insert(doc, function(err, res){
                if(err){
                    console.log(err);
                    process.exit(1);
                }
            });
        }
    });

    db.collection("sample").find().toArray(function(err, docs){
        if(err){
            console.log(err);
            process.exit(1);
        }

        console.log("Found docs:");
        docs.forEach(function(doc){
            console.log(JSON.stringify(doc));
        });

        process.exit(0);
    });
});
