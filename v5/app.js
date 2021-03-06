// var request =require("request");
var express       = require("express"),
bodyParser        = require("body-parser"),
app               = express(),
mongoose          = require("mongoose"),
Campground        = require("./models/campground.js"),
Comment           = require("./models/comment.js"),
passport          = require("passport"),
localStrategy     = require("passport-local"),
User              = require("./models/user.js"),
methodOverride    = require("method-override"),
seed              = require("./seed.js"),
flash             = require("connect-flash");
// seed();
 
var AuthRoute     = require("./routes/auth.js"),
    CommentRoute  = require("./routes/comment.js"),
    CampRoute     = require("./routes/campground.js");

mongoose.connect("mongodb://localhost:27017/campground",{useNewUrlParser:true,useUnifiedTopology:true});
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+"/public"));
app.set('view engine', 'ejs');
app.use(require("express-session")({
	secret:"Dream",
	resave:false,
	saveUninitialized:false,
	cookie:{
		maxAge:1000*60*15
	}
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(flash());
app.locals.moment=require("moment");
app.use(passport.initialize());
app.use(passport.session ());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
	if(req.user){
		res.locals.isLogin=true;
	}	else{
		res.locals.isLogin=false;
	}
	res.locals.CurUser=req.user;
	res.locals.error=req.flash("error");
	res.locals.info=req.flash("info");
	next();
})
app.use(function(req, res, next){
    req.session._garbage = Date();
    req.session.touch();
    next();
});
app.use(methodOverride("_method"));
app.use(AuthRoute);
app.use("/campground/:id/comment",CommentRoute);
app.use("/campground",CampRoute);

var server=app.listen(80,function(){

})
// console.log(server,"pop");
