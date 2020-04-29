var express 										= require('express'),
	router												= express.Router({mergeParams: true}),
	mongoose											= require('mongoose'),
	bodyParser										= require("body-parser"),
	passport											= require('passport'),
	methodOverride								= require('method-override'),
	accountManager								= require('../models/account_manager'),
	assignedJobs									= require('../models/assigned_jobs'),
	candidate											= require('../models/candidate'),
	freelanceRecruiters						= require('../models/freelance_recruiters'),
	jobs													= require('../models/job'),
	middleware										= require('../config/middleware')

  router.get("/",middleware.isLoggedIn,async(req,res)=>{
  	let candidates = await candidate.find({});
  	res.render("candidates/index",{candidates: candidates});
  })

  module.exports = router;
