var mongoose				= require('mongoose');
var freelance_recruiters	= require("./freelance_recruiters");
var account_manager			= require('./account_manager');
var candidate				= require("./candidate");
var jobs					= require('./job');

var assignedJobsSchema = new mongoose.Schema({
	account_manager: {
		type: mongoose.Schema.Types.ObjectId,
		ref: account_manager
	},
	recruiter_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: freelance_recruiters
	},
	job_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: "jobs"
	},
	assigned_date: Date,
	start_date: Date,
	closed_date: Date,
	status: String,
	candidate_id:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "candidate"
		}
	],
	feedback: String
})

module.exports = mongoose.model("assignedJob",assignedJobsSchema);