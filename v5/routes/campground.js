var express    = require("express"),
	router     = express.Router(),
	Campground = require("../models/campground.js"),
	Comment     = require("../models/comment.js"),
	middleware = require("../middleware");
//general campground
router.get("/",function(req,res){
	Campground.find({},function(err,camp){
		if(err){
			console.log(err);
		} else{
			res.render("campground/index",{camp:camp});
		}
	})
});
//creatre new campground
router.post("/",middleware.isLoggedIn,function(req,res){
	var add={Name:req.body.Add,Address:req.body.Image,Description:req.body.Des,author:{
		username:req.user.username,id:req.user._id}};
	
	Campground.create(add,function(err,camp){
		if(err){
			console.log(err);
		}
		res.redirect("/campground");
	})
	

})
//create new campground form
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campground/new");
});
//show campground
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("Comment").exec(function(err,Campobject){
		if(err){
			console.log(err);
		} else{
			res.locals.average=Average(Campobject.Total,Campobject.Comment.length);
			res.render("campground/show",{camp:Campobject});
		}
	})
});
//router edit
router.put("/:id",middleware.OwnershipChecked,function(req,res){
	// var add={Name:req.body.Add,Address:req.body.Image,Description:req.body.Des,author:{
		// username:req.user.username,id:req.user._id}};
	var add={Name:req.body.Add,Address:req.body.Image,Description:req.body.Des};
	Campground.findByIdAndUpdate(req.params.id,add,function(err,FObject){
		// console.log(FObject);
		if(err){
			res.redirect("/campground");
		}else{
			req.flash("info","successfully edited");
			res.redirect("/campground/"+req.params.id);
		}
	})

});
//delete route
router.delete("/:id",middleware.OwnershipChecked,function(req,res){
	Campground.findById(req.params.id,function(err,back){
		if(err){
			res.redirect("/campground");
		} else{
			Comment.remove({"_id": {$in: back.Comment}}, function (err) {
				if(err){
					res.redirect("/campground");
				}	else{
				back.remove();
				req.flash("info","successfully deleted");
				res.redirect("/campground");
				}
			})
		}
	})
})
//edit form
router.get("/:id/Edit",middleware.OwnershipChecked,function(req,res){
	Campground.findById(req.params.id,function(err, foundObj){
		if(err){
			console.log(err);
			res.redirect("/campground");
		} else{
			res.render("campground/edit",{Obj:foundObj});
		}
	})
})
function Average(Total,length){
	return ((Total/length)*2.0).toFixed(1);
}
	

module.exports=router;