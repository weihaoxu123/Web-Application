var express           = require("express"),
	router            = express.Router(),
	User              = require("../models/user.js"),
	passport          = require("passport");
router.get("/",function(req,res){
	res.render("homepage");
});
router.get("/register",function(req,res){
	res.render("register");
})
router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,
		function(err,user){
			if(err){
				console.log(err);
				req.flash("error",err.message);
				return res.redirect("/register");
			}
			passport.authenticate("local")(req,res,function(){
				req.flash("info","Welcome "+user.username)
				res.redirect("/campground");
			})			
		});
});
router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",
	{	successRedirect:"/campground",
		failureRedirect:"/login"
	}),function(req,res){

});
router.get("/logout",function(req,res){
	req.logout();
	req.flash("info","log out");
	res.redirect("/campground");
});
module.exports=router;