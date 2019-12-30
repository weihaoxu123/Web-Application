var mongoose   =require("mongoose");
var campSchema=mongoose.Schema({
	Name:String,
	Address:String,
	Description:String,
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref:"user"
		},
		username: String
	},
	Comment:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref:"Comment"
		}
	],
	Total:{
		type:Number,
		default:0
	}
});
var Campground=mongoose.model("Campground",campSchema);
module.exports=Campground;