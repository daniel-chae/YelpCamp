// all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        } 
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
};

middlewareObj.checkUser = function(req, res, next) {
            if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err, campground){
                if(err){
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
                    //does user own the campground?
                    if(campground.user.id.equals(req.user._id)){
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "You need to be logged in to do that");
            res.redirect("back");
        }
};


middlewareObj.checkComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back");
            } else{
                if(req.user._id.equals(comment.author.id)){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;