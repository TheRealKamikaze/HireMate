var mongoose				= require('mongoose');
var passportLocalMongoose	= require('passport-local-mongoose');
var freelance_recruiters	= require("./freelance_recruiters");
var ass_jobs				= require("./assigned_jobs");
var uniquePlugin = require('mongoose-unique-validator');

var accManagerSchema = new mongoose.Schema({
	employee_id: {
		type: String,
		unique: true
	},
	register_date: Date,
	name: String,
	email: String,
	location: String,
	jobs:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "jobs"		//verify
		}
	],
	freelance_recruiters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "freelance_recruiters"
		}
	],
	active_jobs:[						//verify this
		{
			job_id: ObjectId,
			[
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "ass_jobs"
				}
			]
		}
	],
	password: String
}).plugin(uniquePlugin);

accManagerSchema.plugin(passportLocalMongoose);

modules.export = mongoose.model('account_manager', accManagerSchema);
