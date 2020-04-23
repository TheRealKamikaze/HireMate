var mongoose	= require('mongoose');
var recruiters	= require("./freelance_recruiters");

var accManagerSchema = new mongoose.Schema({
	employee_id: String,
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
	freelance_recruiters
})