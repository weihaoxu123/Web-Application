var MiddleObj={},
Campground 	 = require("../models/campground.js"),
Comment      = require("../models/comment.js"),
User         = require("../models/user.js");
MiddleObj.OwnershipChecked=function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundObj){
			if(err){
				console.log(err);
			}	else{
				if(foundObj.author.id.equals(req.user._id)){
					next();
				}	else{
					console.log("not same");
					res.redirect("back");
				}
			}
		})
	}	else{
		res.redirect("/login");
	}
}
MiddleObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","not logged in");
	res.redirect("/login");
}
MiddleObj.Commentchecked=function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundObj){
			if(err){
				console.log(err);
			}	else{
				if(foundObj.author.id.equals(req.user._id)){
					next();
				}	else{
					req.flash("error","no permisson");
					res.redirect("back");
				}
			}
		})
	}	else{
		req.flash("error","not logged in");
		res.redirect("/login");
	}
}
MiddleObj.AlreadyPost=function(req,res,next){
	User.findById(req.user._id,function(err,backObj){
		if(err){
			res.redirect("back");
		}	else{
				var check=backObj.ReviewedCamp.some(function(item){
					return item.equals(req.params.id);
				});
				if(check){
					req.flash("error","already posted");
					return res.redirect("back");
				}
				else{
					return next();
				}
		}
	})
}


module.exports=MiddleObj