var express 			= require('express'),
	app					= express(),
	bodyParser			= require("body-parser"),
	mongoose			= require('mongoose'),
	passport			= require('passport'),
	LocalStartegy		= require('passport-local'),
	methodOverride		= require('method-override'),
	accountManagers		= require('./models/account_manager'),
	assignedJobs		= require('./models/assigned_jobs'),
	candidate			= require('./models/candidate'),
	freelanceRecruiters	= require('./models/freelance_recruiters'),
	jobs				= require('./models/job'),
	seedDB				= require('./seeds');

// seedDB()
mongoose.connect("mongodb+srv://tarun:bQjO4VVIIsJSNez4@cluster0-a0vpp.mongodb.net/HireMate?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true  },);

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
	accountManagers.find({},function(err,managers){
		if(err)
			console.log(err);
		res.render("index",{accountManagers: managers});
	})
});

app.get("/accountmanager/:id/jobs", function(req,res){
	jobs.find({},function(err,foundJobs){
		if(err)
			console.log(err)
		res.render("accountmanager/jobs",{jobs: foundJobs});
	})
})
app.get("/seedRecruiters",function(req,res){
	accountManagers.find({},function(err,managers){
		if(err)
			console.log(err);
		res.render("seed",{accountManagers: managers});

	})
})

app.get("/addRecruiter/:id",function(req,res){
	freelanceRecruiters.find({},function(err,recruits){
		res.render("listRecruiters",{ recruiters:recruits });
	})

	app.get("/addRecruiter/:id/:id1",function(req,res){
		accountManagers.findById(req.params.id,function(err,manager){
			if(err)
				console.log(err);
			manager.freelance_recruiters.push(req.params.id1);
			manager.save();
			console.log("added")
		})
	})
})


app.post("/accountmanager/:id/job/addrecruiter",function(req,res){
	console.log(req.params.id+" "+req.body.jobId+" "+req.body.recruiterId);
	res.json({string: "done"});
})


app.get("/getAccountManager/:id",function(req,res){
	
	accountManagers.findById(req.params.id).populate("freelance_recruiters").exec(function(err,manager){
		if(err)
			console.log(err)
		console.log(manager)
		res.json(manager);
	})
})

app.listen(3000,function(req,res){
	console.log("HireMate is listening to your job requirements!!");
})
