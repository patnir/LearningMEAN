var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: 'CG1',
        image: 'https://images.unsplash.com/photo-1439946612398-57d8d0ac915d?ixlib=rb-0.3.5&s=4005af16c32eb614cb5537b43b45cd7b&auto=format&fit=crop&w=1050&q=80',
        description: 'Camp Ground 1 is Beautiful'
    }, 
    {
        name: 'CG2',
        image: 'https://images.unsplash.com/photo-1486692957922-ea51ea8472bc?auto=format&fit=crop&w=1073&q=80',
        description: 'Campground 2 is beautiful',
    }, 
    {
        name: 'CG3',
        image: 'https://images.unsplash.com/photo-1459539235056-5045ca20e525?ixlib=rb-0.3.5&s=530efa3b660a7bd06072987a98c1bc34&auto=format&fit=crop&w=1050&q=80',
        description: '<ul>    <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>    <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquamerat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>    <li>Phasellus ultrices nulla quis nibh. Quisquea lectus. Donec consectetuer ligula vulputate sem tristique cursus. Namnulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>    <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li> </ul>             ',
    }, 
    {
        name: 'CG4',
        image: 'https://images.unsplash.com/photo-1459292414836-763d35c7ae4c?ixlib=rb-0.3.5&s=bd02951bae92abbc4f5aad65b08f0a74&auto=format&fit=crop&w=1050&q=80',
        description: 'campground 4 is beautiful'
    }
];

function seedDB() {
    Comment.remove({}, function(err) {
        if(err) {
            console.log(err + "\n\ndeleting comments\n");
        } else {
            console.log("removed comments");

            Campground.remove({}, function(err) {
                if (err) {            
                    console.log("err");
        
                } else {
                    console.log("removed campgrounds");
                    // data.forEach(function(seed) {
                    //     Campground.create(seed, function(err, createdGround) {
                    //         if (err) {
                    //             console.log(err);
                    //         } else {
                    //             Comment.create({
                    //                 text: "This place is the bomb", 
                    //                 author: "Homer"
                    //             }, function(err, comment) {
                    //                 if (err) {
                    //                     console.log(err);
                    //                 } else {
                    //                     createdGround.comments.push(comment._id);
                    //                     createdGround.save();
                    //                     //console.log(createdGround);
                    //                 }
                    //             });
                    //         }
                    //     })
                    // });
                }
            });
        }
    });
}

// function seedDB() {
//     Campground.find({}, function(err, campgrounds) {
//         console.log(campgrounds);
//     })
// }

module.exports = seedDB;


// [ { _id: 5a680edc08546f32e37fece6,
//     name: 'CG1',
//     image: 'https://images.unsplash.com/photo-1439946612398-57d8d0ac915d?ixlib=rb-0.3.5&s=4005af16c32eb614cb5537b43b45cd7b&auto=format&fit=crop&w=1050&q=80',
//     description: 'Camp Ground 1 is Beautiful',
//     __v: 0 },
//   { _id: 5a680edc08546f32e37fece7,
//     name: 'CG2',
//     image: 'https://images.unsplash.com/photo-1486692957922-ea51ea8472bc?auto=format&fit=crop&w=1073&q=80',
//     description: 'Campground 2 is beautiful',
//     __v: 0 },
//   { _id: 5a680edc08546f32e37fece9,
//     name: 'CG4',
//     image: 'https://images.unsplash.com/photo-1459292414836-763d35c7ae4c?ixlib=rb-0.3.5&s=bd02951bae92abbc4f5aad65b08f0a74&auto=format&fit=crop&w=1050&q=80',
//     description: 'campground 4 is beautiful',
//     __v: 0 },
//   { _id: 5a680edc08546f32e37fece8,
//     name: 'CG3',
//     image: 'https://images.unsplash.com/photo-1504519733529-35b35d10eee2?auto=format&fit=crop&w=1051&q=80',
//     description: 'campground 3 is beautiful',
//     __v: 0 },
//   { _id: 5a680f87b02f413320f9e4dc,
//     name: 'CG5',
//     image: 'https://images.unsplash.com/photo-1477742689277-76a0d30f7054?ixlib=rb-0.3.5&s=ffc769a54303b09aab46fd3c8afbb5de&auto=format&fit=crop&w=1050&q=80',
//     description: 'Campground 5 is beautiful',
//     __v: 0 },
//   { _id: 5a681094e074e433bade2248,
//     name: 'CG6',
//     image: 'https://images.unsplash.com/photo-1516254092588-170acff77587?ixlib=rb-0.3.5&s=8f9d8659b1bfeb1ff5de0f9f008e2744&auto=format&fit=crop&w=1056&q=80',
//     description: 'Campgrounds 6 is beatiful',
//     __v: 0 },
//   { _id: 5a6cf1d8c728767e80dc7856,
//     name: 'CG7',
//     image: 'https://images.unsplash.com/photo-1459539235056-5045ca20e525?ixlib=rb-0.3.5&s=530efa3b660a7bd06072987a98c1bc34&auto=format&fit=crop&w=1050&q=80',
//     description: '<ul>    <li>Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</li>    <li>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquamerat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.</li>    <li>Phasellus ultrices nulla quis nibh. Quisquea lectus. Donec consectetuer ligula vulputate sem tristique cursus. Namnulla quam, gravida non, commodo a, sodales sit amet, nisi.</li>    <li>Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc.</li> </ul>             ',
//     __v: 0 } 
// ]


// var mongoose = require("mongoose");
// var Campground = require("./models/campground");
// var Comment   = require("./models/comment");

// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]

// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment._id);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }

// module.exports = seedDB;
