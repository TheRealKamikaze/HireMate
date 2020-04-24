var mongoose				= require('mongoose');
var passportLocalMongoose	= require('passport-local-mongoose');
var ass_jobs				= require("./assigned_jobs");
var uniquePlugin = require('mongoose-unique-validator');

var freelanceRecruitersSchema = new mongoose.Schema({
	register_date: Date,
	name: String,
	email: {
		type: String,
		unique: true
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
			ref: "ass_jobs"
		}
	],
	password: String
}).plugin(uniquePlugin);

freelanceRecruitersSchema.plugin(passportLocalMongoose);
module.export = mongoose.model("freelanceRecruiter",freelanceRecruitersSchema); 