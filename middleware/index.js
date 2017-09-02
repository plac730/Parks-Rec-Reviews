var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All middleware goes here
var middlewareObj = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be logged in first.");
        res.redirect("/login");
        
    },
    checkCommentOwnership: function(req, res, next){
        if (req.isAuthenticated()) {
        // does user own comment?
            Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                if (req.user.username === foundComment.author.username){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
                
            }
        });
        } else {
            req.flash("error", "You need to be logged in first.");
            res.redirect("back");
        } 
    },
    checkCampgroundOwnership: function(req, res, next){
        if (req.isAuthenticated()) {
            // does user own campground
                Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campground not found.");
                    res.redirect("back");
                } else {
                    if (req.user.username === foundCampground.author.username){
                        next();
                    } else{
                        req.flash("error", "You don't have permission to do that.");
                        res.redirect("back");
                    }
                    
                }
            });
        } else {
            req.flash("error", "You need to be logged in first.");
            res.redirect("back");
        } 
    }
}
module.exports = middlewareObj;