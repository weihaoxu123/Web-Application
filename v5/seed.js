var mongoose   = require("mongoose"),
Campground = require("./models/campground.js"),
Comment=require("./models/comment.js");
data=[
	{	Name:"Camp 1",
		Address:"https://cdn.pixabay.com/photo/2019/11/09/14/28/camera-4613669__480.jpg",
		Description:"Camp 1"
	},
	{	Name:"Camp 2",
		Address:"https://cdn.pixabay.com/photo/2019/11/20/04/21/sunglass-4639073__480.jpg",
		Description:"Camp 2"
	},
	{	Name:"Camp 3",
		Address:"https://cdn.pixabay.com/photo/2019/11/20/04/21/sunglass-4639073__480.jpg",
		Description:"Camp 3"
	}

];
function seed(){
	Campground.remove({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed items");
		Comment.remove({},function(err){
			if(err){
				console.log(err);
			} else{
				console.log("comment removed");
				// data.forEach(function(obj){
				// 	Campground.create(obj,function(err,back){
				// 		if(err){
				// 			console.log(err);
				// 		}
				// 		else{
				// 			// console.log(back);
				// 			Comment.create({
				// 				text:"great camp",
				// 				author:"someone"
				// 			},function(err,comment){
				// 				if(err){
				// 					console.log(err);
				// 				} else{
				// 				back.Comment.push(comment);
				// 				back.save();
				// 				}
	
				// 			})
				// 		}
				// 	})	
				// })
			}
		})
		
	})
	
}
module.exports=seed;