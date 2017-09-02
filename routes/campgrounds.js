var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

// Index
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// New campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// Create campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var campObj = {};
    campObj.name = req.body.campground;
    campObj.image = req.body.image;
    campObj.description = req.body.description;
    campObj.price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    campObj.author = author;
    Campground.create(campObj, function(err, newlyCreated) {
        if (err) {
        console.log(err);
    } else {
        req.flash("success", "New Campground Added!");
        res.redirect("campgrounds");
        }
    });
});

// Show - shows more info about one campground
router.get("/:id", function(req, res) {
    // find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log("Couldn't find campground");
        } else {
            // render show template with that campground
             res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit Campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, removedCamp){
       if(err){
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Successfully deleted campground");
           res.redirect("/campgrounds");
       }
   }) 
});

module.exports = router;