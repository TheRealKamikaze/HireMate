var mongoose				= require('mongoose');
var passportLocalMongoose	= require('passport-local-mongoose');
var assignedJobs				= require("./assigned_jobs");
var uniquePlugin = require('mongoose-unique-validator');

var freelanceRecruitersSchema = new mongoose.Schema({
	register_date: Date,
	name: String,
	email: {
		type: String,
		// unique: true
	},
	profile_type: String,
	experience_level: String,
	hours: Number,
	locations: [
		{
			type: String
		}
	],		//verify this
	assigned_jobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "assigned_jobs"
		}
	],
	password: String
})	//.plugin(uniquePlugin);

// freelanceRecruitersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("freelance_recruiters",freelanceRecruitersSchema); 