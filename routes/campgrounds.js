var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
var geocoder = require("geocoder");

// Index
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds, page: 'campgrounds'});
        }
    });
});

// New campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

// Create campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.campground;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    geocoder.geocode(req.body.location, function(err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, image: image, description: desc, price: price, author: author, location: location, lat: lat, lng: lng};
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
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
        geocoder.geocode(req.body.campground.location, function(err, data) {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            var newData = {name: req.body.campground.name, image: req.body.campground.image, description: req.body.campground.description, price: req.body.campground.price, location: location, lat: lat, lng: lng};
       
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/campgrounds");
            } else {
                req.flash("success", "Successfully updated!");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
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