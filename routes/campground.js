var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: campgrounds,
                currentUser: req.user
            });
        }
    });
});

//CREATE - ADD NEW CAMPGROUND TO DATABASE
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.create(req.body, function(err, campground){
        if(err){
            console.log(err);
        } else {
            campground.user.id = req.user._id;
            campground.user.username = req.user.username;
            campground.save();
            //Redirects back to the campground
            res.redirect("/campgrounds");
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    //render show template with that campground
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }   
    }
)});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkUser, function(req, res){
    // is user logged in
    Campground.findById(req.params.id, function(err, campground){
    if(err){
        console.log(err);
        res.redirect("/campgrounds/" + req.params.id);
    } else {
        res.render("./campgrounds/edit", {campground: campground});        
    }});
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkUser, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//DELETE CAMPGROUND ROUTE
router.delete("/:id", middleware.checkUser,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;