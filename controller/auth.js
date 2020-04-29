var express             = require("express"),
    router              = express.Router(),
    passport            = require("passport"),
    accountManagers     = require("../models/account_manager"),
    freelanceRecruiters = require("../models/freelance_recruiters");
                          require('../config/passportConfig')(passport);



//register accountManagers
router.post("/accountManagers/register",async (req,res)=>{
	try{
		// console.log(req.body.manager)
		let manager=accountManagers.findOne({username: req.body.manager.username})
		// console.log(manager.username)
		if(manager.username!==undefined)
			res.status(500);
		else{
			let addManager =await new accountManagers(req.body.manager);
			// console.log("manager:"+addManager)
			addManager.password =  await addManager.hashPassword(req.body.manager.password);
			let	manager1=await addManager.save();
			res.status(201).json({
				"status": "posted"
			})
			// console.log(manager1);
		}
	}catch(err){
					console.log(err)
				}
	})

//register freelanceRecruiters
router.post("/freelancerecruiters/register",async(req,res)=>{
	// console.log(req.body.recruiter)
	try{
		let recruiter=await freelanceRecruiters.findOne({username: req.body.recruiter.username})
		if(recruiter)
			res.status(500).json({
				"error":"username already exists"
			})
		else{
			let addrecruiter = await new freelanceRecruiters(req.body.recruiter);
			addrecruiter.password = await addrecruiter.hashPassword(req.body.recruiter.password);
			let recruiter1 = await addrecruiter.save();
			// console.log(recruiter1);
			res.json({status: "done"});
		}
	}catch(err){
		console.log(err);
		res.status(500)
	}
});


//login accountManagers
router.post("/login/accountManager",passport.authenticate("manager",{
	failureRedirect: "/"
}),async (req,res) =>{
	// console.log(req.user._id)
	res.redirect("/accountManager/"+req.user._id+"/jobs");
})

//login Recruiters
router.post("/login/freelanceRecruiter",passport.authenticate("recruiter",{
	failureRedirect: "/"
}),(req,res)=>{
	res.redirect("/freelancerecruiters/"+req.user._id+"/assignedjobs")
})

//logout users
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

module.exports=router;
