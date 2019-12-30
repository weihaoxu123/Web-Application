var express     = require("express"),
	router      = express.Router({mergeParams:true}),
	Comment     = require("../models/comment.js"),
	Campground  = require("../models/campground.js"),
	User              = require("../models/user.js"),
	middleware  = require("../middleware");
router.get("/new",middleware.isLoggedIn,middleware.AlreadyPost,function(req,res){
	Campground.findById(req.params.id,function(err,back){
		res.render("comment/new",{camp:back});
	})
	
});
router.post("/",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id).populate("Comment").exec(function(err,back){
		Comment.create(req.body.comment,function(err,commentBack){
			commentBack.author.username=req.user.username;
			commentBack.author.id=req.user._id;
			commentBack.save();
			back.Comment.push(commentBack);
			back.Total+=commentBack.Rating;
			back.save();
			req.flash("info","successfully created");
			User.findById(req.user._id,function(err,Userback){
				Userback.ReviewedCamp.push(back);
				Userback.save();
			});
			res.redirect("/campground/"+req.params.id);
		})
		
	})
});
router.get("/:comment_id/edit",middleware.Commentchecked,function(req,res){
	Comment.findById(req.params.comment_id,function(err,back){
		if(err){
			res.redirect("back");
		}	else{
			res.render("comment/edit",{camp_id:req.params.id,obj:back});
		}
	})
})
router.put("/:comment_id",middleware.Commentchecked,function(req,res){	
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,obj){
		if(err){
			res.redirect("back");
		}	else{
			Campground.findById(req.params.id,function(err,back){
				if(err){
					res.redirect("back");
				}	else{
					back.Total+=req.body.comment.Rating-obj.Rating;
					back.save();
				}
			});
			req.flash("info","successfully edited");
			res.redirect("/campground/"+req.params.id);
		}
	})
})
router.delete("/:comment_id",middleware.Commentchecked,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}	else{
			User.update({_id:req.user._id},{$pull:{ReviewedCamp:req.params.id}},function(err,raw){
				console.log(raw);
			});
			Campground.update({_id:req.params.id},{$pull:{Comment:req.params.comment_id}},function(err,raw){
				console.log(raw);
			});
			req.flash("info","successfully deleted");
			res.redirect("/campground/"+req.params.id);
		}
	})
})

module.exports=router;