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
mongoose.connect("mongodb+srv://tarun:bQjO4VVIIsJSNez4@cluster0-a0vpp.mongodb.net/HireMate?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true  },);

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

//shows all available jobs
app.get("/accountmanager/:id/jobs", function(req,res){
	jobs.find({},function(err,foundJobs){
		if(err)
			console.log(err)
		res.render("accountmanager/jobs",{jobs: foundJobs});
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
//list the recruiters available
app.get("/addRecruiter/:id",function(req,res){
	freelanceRecruiters.find({},function(err,recruits){
		res.render("listRecruiters",{ recruiters:recruits });
	})


	//dummy route to seed recruiters for each accountManager
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

//assign recruiters to the job
app.post("/accountmanager/:id/job/addrecruiter",function(req,res){
	// console.log(req.params.id+" "+req.body.jobId+" "+req.body.recruiterId);
	
	var today=new Date();
	// console.log("RecruiterId: "+req.body.recruiterId)
	var assjob={
		account_manager: req.params.id,
		recruiter_id: req.body.recruiterId,
		job_id: req.body.jobId,
		assigned_date: today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds(),
		start_date: '2020-06-22',
		closed_date: '2020-06-22',
		status: "none"
	}
	 assignedJobs.create(assjob,function(err,addedAssignedJob){
	 	if(err)
	 		console.log(err)
	 	accountManagers.findById(addedAssignedJob.account_manager,function(err,manager){
	 		manager.jobs.push(addedAssignedJob._id);
	 		manager.save();
	 	});
	 	freelanceRecruiters.findById(addedAssignedJob.recruiter_id,function(err,recruiter){
	 		recruiter.assigned_jobs.push(addedAssignedJob._id);
	 		recruiter.save();
	 	})
	 	console.log(addedAssignedJob);
	 	res.json({string: "done"});
	 })
})

//get details of accountManager Logged in
app.get("/getAccountManager/:id",function(req,res){
	
	accountManagers.findById(req.params.id).populate("freelance_recruiters").exec(function(err,manager){
		if(err)
			console.log(err)
		console.log(manager)
		res.json(manager);
	})
})



//getting assigned jobs for the account manager
app.get("/accountmanager/:id/assignedjobs",async (req,res)=>{
	console.log(req.params.id);
	let jobArray=[];
	let assignedjobs= await assignedJobs.find({account_manager: req.params.id});
	for(let updateJob of assignedjobs){
		jobArray.push(updateJob.job_id);
	}
	jobArray2 = [... new Set(jobArray)] 
	console.log(jobArray2);
	jobArray.splice(0,jobArray.length)
	console.log(jobArray);
	try{
		for(eachJob of jobArray2){
			let addjob = await jobs.findById(eachJob);
			jobArray.push(addjob);
		}

	}catch(err){
		console.log(err)
	}
	res.render("accountmanager/assignedjobs",{jobs:jobArray});
})

app.get("/accountmanager/:id/assignedjobs/:jobid/candidates",async (req,res)=>{
	let assjobs  = await assignedJobs.find({job_id: req.params.jobid});
	let candidates=[]
	for(let eachAssJob of assjobs){
		let candies = await eachAssJob.candidate_id;
		for(let candy of candies){
			console.log(candy)
			candidates.push(candy);
		}
	}
	let candidates2=await [... new Set(candidates)];
	console.log(candidates2);
	candidates.splice(0,candidates.length)
	for( let eachCandidate of candidates2){
		let eachcandy = await candidate.findById(eachCandidate);
		console.log(eachcandy)
		candidates.push(await eachcandy);
	}
	console.log(candidates);
	res.render("candidates/index",{candidates: candidates});
})

//assigned jobs for recruiters
app.get("/freelancerecruiters/:id/assignedjobs",async (req,res)=>{
		const recruits= (await freelanceRecruiters.findById(req.params.id).populate("assigned_jobs"));
		let jobsToSend =[];
		for(let assjobs of recruits.assigned_jobs){
			const jobb = await jobs.findById(assjobs.job_id);
			let temp =await JSON.parse(JSON.stringify(jobb))
			temp.assigned_job=await assjobs._id;
			temp.status=await assjobs.status;
			jobsToSend.push(await temp);
			console.log(jobsToSend)
		}
		res.render("freelancerecruiters/jobs",{jobs:jobsToSend});
})

// accept jobs 
app.post("/freelancerecruiters/:id/actionJob", async (req,res)=>{
	let job= await assignedJobs.findById(req.body.assignedJob);
	// console.log(req.body.jobStatus)
	job.status=req.body.jobStatus;
	job.save();
	// console.log(job);
	res.json(job);
})

//get candidates
app.get("/getCandidates",function(req,res){
	candidate.find({},function(err,candidd){
		if(err)
			console.log(err)
		// console.log(candidd)
		res.json(candidd);
	})
})

app.post("/freelancerecruiters/:id/job/addCandidate",function(req,res){
	assignedJobs.findById(req.body.assignedJob,function(err,job){
		job.candidate_id.push(req.body.candidateId);
		job.save();
		console.log(job)
		res.json(job);
	})
})

app.listen(3000,function(req,res){
	console.log("HireMate is listening to your job requirements!!");
})
