var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Index
router.get("/", function(req, res){
    res.render("landing");
});

// Auth Routes

// Show register form
router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

// Handle register
router.post("/register", function(req, res){
    var newUser = new User({ username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // req.flash("error", err.message);
            // return res.redirect("back");
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

// Handle Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    successFlash: "Welcome back to YelpCamp",
    failureFlash: "Sorry, login failed."
    })
);



// Logout
router.get("/logout", function(req, res){
    req.flash("success", req.user.username + " has logged out.");
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;