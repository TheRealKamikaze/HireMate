var express 										= require('express'),
	app														= express(),
	mongoose											= require('mongoose'),
	bodyParser										= require("body-parser"),
	passport											= require('passport'),
	methodOverride								= require('method-override'),
	accountManagers								= require('./models/account_manager'),
	assignedJobs									= require('./models/assigned_jobs'),
	candidate											= require('./models/candidate'),
	freelanceRecruiters						= require('./models/freelance_recruiters'),
	jobs													= require('./models/job'),
	seedDB												= require('./seeds'),
	axios													=	require('axios'),
	middleware										= require('./config/middleware'),
	authController								= require('./controller/auth'),
	accountManagerController			= require('./controller/accountManager'),
	freelanceRecruiterController 	= require('./controller/freelanceRecruiter'),
	candidateController 					= require('./controller/candidate');
	require('./config/passportConfig')(passport);
// seedDB()
mongoose.connect("mongodb+srv://tarun:Cacn0iY2XIh9eIDr@cluster0-a0vpp.mongodb.net/HireMate?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true  },);

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

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
})

app.use(authController);
app.use("/accountmanager",accountManagerController);
app.use("/freelancerecruiters",freelanceRecruiterController);
app.use("/candidates",candidateController);
//landing Page
app.get("/",function(req,res){
	accountManagers.find({},function(err,managers){
		if(err)
			console.log(err);
		freelanceRecruiters.find({},function(err,recruits){
			if(err)
				console.log(err)
			res.render("index",{accountManagers: managers,recruiters: recruits});

		})
	})
});

//get details of accountManager Logged in
app.get("/getAccountManager/:id",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,function(req,res){

	accountManagers.findById(req.params.id).populate("freelance_recruiters").exec(function(err,manager){
		if(err)
			console.log(err)
		// console.log(manager)
		res.json(manager);
	})
})

//route to select account manager you want to seed recruiters in
app.get("/seedRecruiters",function(req,res){
	accountManagers.find({},function(err,managers){
		if(err)
			console.log(err);
		res.render("seed",{accountManagers: managers});

	})
})


//get candidates
app.get("/getCandidates",middleware.isLoggedIn,function(req,res){
	candidate.find({},function(err,candidd){
		if(err)
			console.log(err)
		// console.log(candidd)
		res.json(candidd);
	})
})

app.get("/*",async(req,res)=>{
	res.render("404");
})
app.listen(process.env.PORT, process.env.IP,function(req,res){
	console.log("HireMate is listening to your job requirements!!");
})
