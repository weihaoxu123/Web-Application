var mongoose   =require("mongoose");
var commentSchema=mongoose.Schema({
	text:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username: String
	},
	createdDate:{type:Date,default:Date.now},
	Rating:Number
});
var Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;