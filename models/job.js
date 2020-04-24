var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	job_title: String,
	company_name: String,
	dept_name: String,
	location: String,
	job_number: Number,
	experience: String,
	no_of_positions: Number,
	Salary: String
})

module.exports = mongoose.model("job",jobSchema);