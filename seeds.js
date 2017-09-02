var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm3.staticflickr.com/2655/3738566424_180036be3f.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nisi aliquam, fermentum ligula eu, vestibulum ipsum. Duis quis mi ex. Duis velit massa, porta quis mi et, laoreet gravida diam. Vestibulum dapibus feugiat imperdiet. Integer non tempus lacus. Fusce tincidunt nibh eu vehicula malesuada. Nunc sodales nibh et sapien posuere venenatis. Phasellus eu tristique massa. Praesent erat dolor, sollicitudin at bibendum in, malesuada ut odio. Curabitur vel ultricies risus. Aliquam vitae dolor massa. Nullam in lorem vitae nibh luctus euismod. Nulla varius nisi in lacinia facilisis. Sed sagittis ipsum tortor, sit amet porttitor lacus hendrerit quis. Fusce ultrices egestas porta. Vivamus quis ipsum luctus, laoreet orci sed, iaculis velit."
    },
    {
        name: "Billy Goat's Bluff",
        image: "https://farm4.staticflickr.com/3069/2618662727_4603c3a203.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nisi aliquam, fermentum ligula eu, vestibulum ipsum. Duis quis mi ex. Duis velit massa, porta quis mi et, laoreet gravida diam. Vestibulum dapibus feugiat imperdiet. Integer non tempus lacus. Fusce tincidunt nibh eu vehicula malesuada. Nunc sodales nibh et sapien posuere venenatis. Phasellus eu tristique massa. Praesent erat dolor, sollicitudin at bibendum in, malesuada ut odio. Curabitur vel ultricies risus. Aliquam vitae dolor massa. Nullam in lorem vitae nibh luctus euismod. Nulla varius nisi in lacinia facilisis. Sed sagittis ipsum tortor, sit amet porttitor lacus hendrerit quis. Fusce ultrices egestas porta. Vivamus quis ipsum luctus, laoreet orci sed, iaculis velit."
    },
    {
        name: "Desert Mesa",
        image: "https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nisi aliquam, fermentum ligula eu, vestibulum ipsum. Duis quis mi ex. Duis velit massa, porta quis mi et, laoreet gravida diam. Vestibulum dapibus feugiat imperdiet. Integer non tempus lacus. Fusce tincidunt nibh eu vehicula malesuada. Nunc sodales nibh et sapien posuere venenatis. Phasellus eu tristique massa. Praesent erat dolor, sollicitudin at bibendum in, malesuada ut odio. Curabitur vel ultricies risus. Aliquam vitae dolor massa. Nullam in lorem vitae nibh luctus euismod. Nulla varius nisi in lacinia facilisis. Sed sagittis ipsum tortor, sit amet porttitor lacus hendrerit quis. Fusce ultrices egestas porta. Vivamus quis ipsum luctus, laoreet orci sed, iaculis velit."
    },
    {
        name: "Canyon Floor",
        image: "https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ac nisi aliquam, fermentum ligula eu, vestibulum ipsum. Duis quis mi ex. Duis velit massa, porta quis mi et, laoreet gravida diam. Vestibulum dapibus feugiat imperdiet. Integer non tempus lacus. Fusce tincidunt nibh eu vehicula malesuada. Nunc sodales nibh et sapien posuere venenatis. Phasellus eu tristique massa. Praesent erat dolor, sollicitudin at bibendum in, malesuada ut odio. Curabitur vel ultricies risus. Aliquam vitae dolor massa. Nullam in lorem vitae nibh luctus euismod. Nulla varius nisi in lacinia facilisis. Sed sagittis ipsum tortor, sit amet porttitor lacus hendrerit quis. Fusce ultrices egestas porta. Vivamus quis ipsum luctus, laoreet orci sed, iaculis velit."
    }
];

var data2 = [
    {
        text: "This is a great campsite!",
        author: { username: "adam" }
    },
    {
        text: "This camp's view was amazing!",
        author: { username: "bob" }
    },
    {
        text: "Never coming back here again, terrible experience!",
        author: { username: "charlie" }
    },
    {
        text: "Pretty scenic campsite but I wish there was internet..",
        author: { username: "dave" }
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
    //     if (err){
    //         console.log(err);
    //     } else {
    //         console.log("Removed campgrounds");
    //         // Add a few campgrounds
    //         data.forEach(function(seedCamp){
    //             Campground.create(seedCamp, function(err, campground){
    //                 if (err){
    //                     console.log(err);
    //                 } else {
    //                     console.log("Added a campground");
    //                     // Create a comment
    //                     data2.forEach(function(seedComment){
    //                         Comment.create(seedComment, function(err, comment) {
    //                             if(err) {
    //                                 console.log(err);
    //                             } else {
    //                                 campground.comments.push(comment);
    //                                 campground.save();
    //                                 console.log("Created new comment for " + campground.name);
    //                             }
    //                         });
    //                     })
                        
    //                 }
    //             });
    //         });
    //     }
    });
}

module.exports = seedDB;