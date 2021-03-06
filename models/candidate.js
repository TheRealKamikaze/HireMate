var mongoose				= require('mongoose');
var ass_jobs				= require("./assigned_jobs");


var candidateSchema = new mongoose.Schema({
	name: String,
	location: String,
	assigned_job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ass_jobs" 
	},
	submit_date: Date,
	job_title: String,
	status: String,
	experience: Number,
	qualification: String,
	skills: [
		{
			type:String
		}
	],
	additional_skills:[
		{
			type:String
		}
	]
})

module.exports = mongoose.model("candidate",candidateSchema);