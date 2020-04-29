var express 										= require('express'),
	router												= express.Router({mergeParams: true}),
	mongoose											= require('mongoose'),
	bodyParser										= require("body-parser"),
	passport											= require('passport'),
	methodOverride								= require('method-override'),
	accountManagers								= require('../models/account_manager'),
	assignedJobs									= require('../models/assigned_jobs'),
	candidate											= require('../models/candidate'),
	freelanceRecruiters						= require('../models/freelance_recruiters'),
	jobs													= require('../models/job'),
	middleware										= require('../config/middleware')



//shows all available jobs
router.get("/:id/jobs",middleware.isLoggedIn,middleware.ensureManager, function(req,res){
	jobs.find({},function(err,foundJobs){
		if(err)
		console.log(err)
		res.render("accountManager/jobs",{jobs: foundJobs});
	})
})


	// route to seed recruiters for each
	router.post("/:id/addRecruiter",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,async(req,res)=>{
		try{
			let manager = await accountManagers.findById(req.params.id);
			await manager.freelance_recruiters.push(req.body.recruiterId);
			let manager1= await manager.save();
			// console.log("added "+manager1);
			res.status(201);
		}catch(err){
				console.log(err);
				res.status(500);
		}
		})

//assign recruiters to the job
router.post("/:id/job/addrecruiter",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,function(req,res){
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
	 	// console.log(addedAssignedJob);
	 	res.json({string: "done"});
	 })
})

//getting assigned jobs for the account manager
router.get("/:id/assignedjobs",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,async (req,res)=>{
	try{
		// console.log(req.params.id);
		let jobArray=[];
		let assignedjobs= await assignedJobs.find({account_manager: req.params.id});
		for(let updateJob of assignedjobs){
			jobArray.push(updateJob.job_id);
		}
		let jobArray2 = [];
		let checkArray=[];
		for(let eachjob of jobArray){
			if(!checkArray.includes(eachjob.toString())){
				jobArray2.push(eachjob);
				checkArray.push(eachjob.toString())
			}
		}
		// console.log(jobArray2);
		jobArray.splice(0,jobArray.length)
		//console.log(jobArray);
		for(eachJob of jobArray2){
			let addjob = await jobs.findById(eachJob);
			jobArray.push(addjob);
		}
		res.render("accountManager/assignedjobs",{jobs:jobArray});

	}catch(err){
		console.log(err)
	}
})

router.get("/:id/assignedjobs/:jobid/candidates",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,async (req,res)=>{
	let assjobs  = await assignedJobs.find({job_id: req.params.jobid});
	let candidates=[]
	for(let eachAssJob of assjobs){
		let candies = await eachAssJob.candidate_id;
		for(let candy of candies){
			// console.log(candy)
			candidates.push(candy);
		}
	}
	let candidates2=await [... new Set(candidates)];
	// console.log(candidates2);
	candidates.splice(0,candidates.length)
	for( let eachCandidate of candidates2){
		let eachcandy = await candidate.findById(eachCandidate);
		// console.log(eachcandy)
		candidates.push(await eachcandy);
	}
	// console.log(candidates);
	res.render("candidates/index",{candidates: candidates});
})

//showing all Recruiters
router.get("/:id/recruiters",middleware.isLoggedIn,middleware.ensureManager,middleware.ensureSameOwner,async(req,res)=>{
	try{
		let recruiters = await freelanceRecruiters.find({});
		res.render("accountManager/recruiters",{recruiters: recruiters});
	}catch(err){
		console.log(err);
		res.status(500);
	}
})

module.exports = router;
