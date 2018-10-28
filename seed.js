var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var Data = [
    {
        name: "Cloud's rest",
        image: "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Cloud's rest2",
        image: "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Cloud's rest3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IXjykhscxUicfRn_yFsuYHXVBsw0reqlrVvSnJStH-6dpso_",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    ];

//Remove all campgrounds
function seedDB(){
Campground.remove({}, function(err){
    if (err){
        console.log(err);
    } else {
        console.log("removed campgrounds!");
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
        });
        Data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //Create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save(); 
                                console.log("created a comment");
                                }
                        });
                    }
                });
        });
    }
});
}

module.exports = seedDB;

//Add some campgrounds
