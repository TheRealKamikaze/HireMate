var mongoose				= require('mongoose');
var ass_jobs				= require("./assigned_jobs");


var candidateSchema = new mongoose.Schema({
	assigned_job: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ass_jobs" 
	},
	submit_date: Date,
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