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
        db.collection("sample").insert({"{i}": val}, function(err, res){
            if(err){
                console.log(err);
                process.exit(1);
            }

            i++;
        });
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
