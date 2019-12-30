var mongoose=require("mongoose"),
passportLocalMongoose=require("passport-local-mongoose");
var userSchema= new mongoose.Schema({
	userName:String,
	password:String,
	ReviewedCamp:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Campground"
		}
	]
});
userSchema.plugin(passportLocalMongoose);
var User=mongoose.model("user",userSchema);
module.exports=User;