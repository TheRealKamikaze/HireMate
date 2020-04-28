var mongoose 						= require("mongoose"),
	jobs	 								= require("./models/job"),
	freelance_recruiters	= require('./models/freelance_recruiters'),
	accountManagers				= require('./models/account_manager'),
	candidate							= require('./models/candidate'),
	axios									=	require('axios');


var data = [
			{
				job_title: "Software Developer",
				company_name: "Google",
				dept_name: "Google Cloud",
				location: "Palo Alto",
				job_number: 123456,
				job_type: "Full-time",
				experience: "7-10 Years",
				no_of_positions: 1,
				salary: "$100k"
			},
			{
				job_title: "Software Development Engineer",
				company_name: "Amazon",
				dept_name: "India",
				location: "Bangalore",
				job_number: 123456,
				job_type: "Full-time",
				experience: "7-10 Years",
				no_of_positions: 2,
				salary: " ₹1.050 Million"
			},
			{
				job_title: "Digital Marketeer",
				company_name: "Facebook",
				dept_name: "Digital marketing",
				location: "Palo Alto",
				job_number: 123456,
				job_type: "Full-time",
				experience: "7-10 Years",
				no_of_positions: 1,
				salary: "$200k"
			},
			{
				job_title: "Software Developer",
				company_name: "Accenture",
				dept_name: "SAP",
				location: "Airoli",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-3 Years",
				no_of_positions: 10,
				salary: " ₹450k"
			},
			{
				job_title: "Software QA",
				company_name: "Wolters Kluwer",
				dept_name: "Compliance",
				location: "Pune",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-2 Years",
				no_of_positions: 1,
				salary: " ₹700k"
			},
			{
				job_title: "Salesforce Developer",
				company_name: "Wolters Kluwer",
				dept_name: "SFDC",
				location: "Pune",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-2 Years",
				no_of_positions: 1,
				salary: " ₹700k"
			},
			{
				job_title: "Software Developer",
				company_name: "TATA Power",
				dept_name: "Software",
				location: "Chennai",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-1 Years",
				no_of_positions: 1,
				salary: " ₹550k + incentives"
			},
			{
				job_title: "Software Developer",
				company_name: "Carwale",
				dept_name: "Android Development",
				location: "Vashi",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-2 Years",
				no_of_positions: 1,
				salary: " ₹720k"
			},
			{
				job_title: "Security Analyst",
				company_name: "Google",
				dept_name: "Google Cloud",
				location: "Palo Alto",
				job_number: 123456,
				job_type: "Full-time",
				experience: "7-10 Years",
				no_of_positions: 1,
				salary: "$100k"
			},
			{
				job_title: "Software Developer",
				company_name: "Amadeus Labs",
				dept_name: "Travel",
				location: "Bangalore",
				job_number: 123456,
				job_type: "Full-time",
				experience: "0-1 Years",
				no_of_positions: 1,
				salary: "$955k"
			}
]


var recruiterData = [
			{
				username: "amit.mahajan",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Amit Mahajan",
				email: "a13@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "akshay.kotak",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Akshay Kotak",
				email: "a12@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "tarun.lohana",
				password: "tarunlohana",
				register_date: '2018-10-22',
				name: "Tarun Lohana",
				email: "a11@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "shivam.sansare",
				password: "shivamsansare",
				register_date: '2018-10-22',
				name: "Shivam Sansare",
				email: "a10@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "muskaan.gupta",
				password: "muskaangupta",
				register_date: '2018-10-22',
				name: "Muskaan Gupta",
				email: "a9@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "yash.acharya",
				password: "yashacharya",
				register_date: '2018-10-22',
				name: "Yash Acharya",
				email: "a8@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "shubham.chhipa",
				password: "shubhamchhipa",
				register_date: '2018-10-22',
				name: "Shubham Chhipa",
				email: "a7@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "jay.lohana",
				password: "jaylohana",
				register_date: '2018-10-22',
				name: "Jay Lohana",
				email: "a6@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "jaynam.sanghvi",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Jaynam Sanghvi",
				email: "a5@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "yogesh.khatri",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Yogesh Khatri",
				email: "a4@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "pappu.kalani",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Pappu Kalani",
				email: "a3@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "kumar.ailani",
				password: "amitmahajan",
				register_date: '2018-10-22',
				name: "Kumar Ailani",
				email: "a1@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			},
			{
				username: "narendra.modi",
				password: "motaBhai",
				register_date: '2018-10-22',
				name: "Narendra Modi",
				email: "a2@m.jan",
				profile_type: "perm",
				experience_level: "5 years",
				hours: 10,
				locations: ["mumbai", "pune"]
			}
]

accountManagerdata=[
		{
			username: "bukhaaChuha",
			employee_id: "1234",
			register_date: "2000-10-22",
			name: "Mickey Mouse",
			email: "mickeymouse@disneyLand.com",
			location: "imagination",
			password: "abc"
		},
		{
			username: "minnie",
			employee_id: "12345",
			register_date: "2001-10-22",
			name: "Minnie Mouse",
			email: "minniemouse@disneyLand.com",
			location: "imagination",
			password: "abc"
		},
		{
			username: "Oliver.Queen",
			employee_id: "123456",
			register_date: "2001-10-22",
			name: "Oliver Queen",
			email: "oliverqueen@starlingcity.com",
			location: "imagination",
			password: "bestArcherAlive"
		}
]

var candidateData=[
	{
		name: "Vijay Gajwani",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'Android Developer',
		qualification: 'BE',
		location: 'Mumbai',
		experience: 5,
		skills: ["C","Java"],
		additional_skills: ["Web","backend"]
	},
	{
		name: "Varsha Chhipa",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'Android Developer',
		qualification: 'BE',
		experience: 5,
		location: 'Mumbai',
		skills: ["C","Java"],
		additional_skills: ["Web","backend"]
	},
	{
		name: "Saloni bhambhure",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'IOS Developer',
		qualification: 'BE',
		experience: 5,
		location: 'Mumbai',
		skills: ["C","Java"],
		additional_skills: ["Web","backend"]
	},
	{
		name: "Hardik Rathod",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'Android Developer',
		qualification: 'BE',
		experience: 5,
		skills: ["C","Java"],
		location: 'Mumbai',
		additional_skills: ["Web","backend"]
	},
	{
		name: "Animesh Ghosh",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'SFDC Developer',
		qualification: 'BE',
		experience: 5,
		skills: ["C","Java"],
		location: 'Mumbai',
		additional_skills: ["Web","backend"]
	},
	{
		name: "Dhruvil Shah",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'SAP analyst',
		qualification: 'BE',
		experience: 5,
		location: 'Mumbai',
		skills: ["C","Java"],
		additional_skills: ["Web","backend"]
	},
	{
		name: "Aniket Patil",
		submit_date: '2020-04-25',
		status: 'none',
		job_title: 'Web Developer',
		qualification: 'BE',
		experience: 5,
		location: 'Mumbai',
		skills: ["C","Java"],
		additional_skills: ["Web","backend"]
	}

]

function seedDB(){
	jobs.remove({},function(err){
		if(err)
			console.log(err)
		console.log("cleared");
	})

	data.forEach(function(job){
		jobs.create(job,function(err,addedJob){
			if(err)
				console.log(err);
			// console.log(addedJob);
		})
	})

	freelance_recruiters.remove({},function(err){
		if(err)
			console.log(err)
		console.log("cleared");
	})

	recruiterData.forEach(async (recruiter)=> {
			try{
				let reponse = await axios.post("http://127.0.0.1:3000/freelancerecruiters/register",{"recruiter": recruiter});
				// console.log(response);
			}catch(err){
				console.log(err);
			}
		})


	accountManagers.remove({},function(err){
		if(err)
			console.log(err)
		console.log("cleared");
	})

	accountManagerdata.forEach(async(accountManager)=>{
		try{
			let response = await axios.post("http://127.0.0.1:3000/accountManagers/register",{"manager": accountManager});
			// console.log(response);
		}catch(err){
			console.log(err);
		}
	})

	candidate.remove({},function(err){
		if(err)
			console.log(err)
		console.log("cleared");
	})

	candidateData.forEach(function(candy){
		candidate.create(candy,function(err,addedCandidate){
			if(err)
				console.log(err);
			// console.log(addedCandidate);
		})
	})

}

module.exports = seedDB;
