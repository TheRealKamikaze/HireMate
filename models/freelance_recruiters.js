var mongoose				= require('mongoose');
var assignedJobs				= require("./assigned_jobs");
var uniquePlugin = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
var freelanceRecruitersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
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
	],
	assigned_jobs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "assigned_jobs"
		}
	],
	password: {
		type: String,
		required: true
	},
	role: {
		type: Number,
		default: 0
	}
}).plugin(uniquePlugin);

freelanceRecruitersSchema.methods.hashPassword = async(password)=>{
	return await bcrypt.hash(password,10)
}

freelanceRecruitersSchema.methods.comparePassword = async (password,hash)=>{
	// console.log("in")
	return await bcrypt.compare(password,hash)
}
module.exports = mongoose.model("freelance_recruiters",freelanceRecruitersSchema);
