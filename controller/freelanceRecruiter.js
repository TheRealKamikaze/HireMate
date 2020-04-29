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
	middleware										= require('../config/middleware');

  router.get("/:id/assignedjobs",middleware.isLoggedIn,middleware.ensureRecruiter,middleware.ensureSameOwner,async (req,res)=>{
  		const recruits= (await freelanceRecruiters.findById(req.params.id).populate("assigned_jobs"));
  		let jobsToSend =[];
  		for(let assjobs of recruits.assigned_jobs){
  			const jobb = await jobs.findById(assjobs.job_id);
  			let temp =await JSON.parse(JSON.stringify(jobb))
  			temp.assigned_job=await assjobs._id;
  			temp.status=await assjobs.status;
  			jobsToSend.push(await temp);
  			// console.log(jobsToSend)
  		}
  		res.render("freelancerecruiters/jobs",{jobs:jobsToSend});
  })

  // accept jobs
  router.post("/:id/actionJob",middleware.isLoggedIn, middleware.ensureRecruiter,middleware.ensureSameOwner,async (req,res)=>{
  	let job= await assignedJobs.findById(req.body.assignedJob);
  	// console.log(req.body.jobStatus)
  	job.status=req.body.jobStatus;
  	job.save();
  	// console.log(job);
  	res.json(job);
  })


  router.post("/:id/job/addCandidate",middleware.isLoggedIn,middleware.ensureRecruiter,middleware.ensureSameOwner,function(req,res){
  	assignedJobs.findById(req.body.assignedJob,function(err,job){
  		job.candidate_id.push(req.body.candidateId);
  		job.save();
  		// console.log(job)
  		res.json(job);
  	})
  })

  router.get("/:id/acceptedjobs",middleware.isLoggedIn,middleware.ensureRecruiter,middleware.ensureSameOwner,async(req,res)=>{
  	try{
  		let recruiter = await freelanceRecruiters.findById(req.params.id).populate("assigned_jobs");
  		let acceptedJobs=[];
  		for(let assjobs of recruiter.assigned_jobs){
  			if(assjobs.status==="accepted"){
  				const jobb = await jobs.findById(assjobs.job_id);
  				let temp =await JSON.parse(JSON.stringify(jobb))
  				temp.assigned_job=await assjobs._id;
  				temp.status=await assjobs.status;
  				acceptedJobs.push(await temp);
  				// console.log(jobsToSend)
  			}
  		}
  		res.render("freelancerecruiters/jobs",{jobs:acceptedJobs});
  	}catch(err){
  		res.status(500);
  	}
  })

  router.get("/:id/rejectedjobs",middleware.isLoggedIn,middleware.ensureRecruiter,middleware.ensureSameOwner,async(req,res)=>{
  	try{
  		let recruiter = await freelanceRecruiters.findById(req.params.id).populate("assigned_jobs");
  		let rejectedJobs=[];
  		for(let assjobs of recruiter.assigned_jobs){
  			if(assjobs.status==="rejected"){
  				const jobb = await jobs.findById(assjobs.job_id);
  				let temp =await JSON.parse(JSON.stringify(jobb))
  				temp.assigned_job=await assjobs._id;
  				temp.status=await assjobs.status;
  				rejectedJobs.push(await temp);
  				// console.log(jobsToSend)
  			}
  		}
  		res.render("freelancerecruiters/jobs",{jobs:rejectedJobs});
  	}catch(err){
  		res.status(500);
  	}
  })

module.exports = router;
