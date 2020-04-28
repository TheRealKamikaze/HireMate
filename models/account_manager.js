var mongoose				= require('mongoose');
var freelance_recruiters	= require("./freelance_recruiters");
var ass_jobs				= require("./assigned_jobs");
var uniquePlugin 			= require('mongoose-unique-validator');
var jobs					= require('./job');
const bcrypt = require("bcrypt");

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
	username: {
		type: String,
		required: true
	},
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
	password: {
		type: String,
		required: true
	},
	role: {
		type: Number,
		default: 1
	}
}).plugin(uniquePlugin);

accManagerSchema.methods.hashPassword = async (password)=>{
	return await bcrypt.hash(password,10)
}

accManagerSchema.methods.comparePassword = async (password,hash)=>{
	return await bcrypt.compare(password,hash)
}

module.exports = mongoose.model('account_manager', accManagerSchema);
