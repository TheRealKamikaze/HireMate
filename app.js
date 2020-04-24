var express 			= require('express'),
	app					= express(),
	bodyParser			= require("body-parser"),
	mongoose			= require('mongoose'),
	passport			= require('passport'),
	LocalStartegy		= require('passport-local'),
	methodOverride		= require('method-override'),
	accountManager		= require('./models/account_manager'),
	assignedJobs		= require('./models/assigned_jobs'),
	candidate			= require('./models/candidate'),
	freelanceRecruiters	= require('./models/freelance_recruiters'),
	jobs				= require('./models/job');


mongoose.connect("mongodb+srv://tarun:bQjO4VVIIsJSNez4@cluster0-a0vpp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true  },);

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(require("express-session")({
    secret: "Oliver Queen is the Green Arrow",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStartegy(user.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(function(req,res,next){
// 	res.locals.currentUser=req.user;
// 	next();
// })

app.get("/",function(req,res){
	res.render("index");
});

app.listen(3000,function(req,res){
	console.log("HireMate is listening to your job requirements!!");
})
