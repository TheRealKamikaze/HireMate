var mongoose				= require('mongoose');
var passportLocalMongoose	= require('passport-local-mongoose');
var freelance_recruiters	= require("./freelance_recruiters");
var ass_jobs				= require("./assigned_jobs");
var uniquePlugin 			= require('mongoose-unique-validator');
var jobs					= require('./job');

var activeJobSchema=new mongoose.Schema({
			job_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "jobs"
			},
			assigned_recruiters: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "ass_jobs"
				}
			]
		
}); 

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
			ref: "jobs"		
		}
	],
	freelance_recruiters: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "freelance_recruiters"
		}
	],
	active_jobs:[activeJobSchema],
	password: String
}).plugin(uniquePlugin);

accManagerSchema.plugin(passportLocalMongoose);

module.export = mongoose.model('account_manager', accManagerSchema);
