const express   = require("express");
const passport  = require("passport");
const middlewareObject={
  isLoggedIn : async(req,res,next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    return res.redirect("/");
  },

  ensureManager: async(req,res,next) => {
    if(req.user.role===1){
      return next();
    }
    return res.redirect("back");
  },

  ensureRecruiter: async(req,res,next) => {
    if(req.user.role==0){
      return next();
    }
    res.redirect("back");
  },
  ensureSameOwner: async(req,res,next)=>{
    console.log(req.user._id.toString()==="abc");
    console.log()
    if(req.user._id.toString()===req.params.id.toString()){
      return next();
    }
    if(req.user.role==1){
      res.redirect('/accountManager/'+req.user._id+'/jobs');
    }else{
      res.redirect('/freelancerecruiters/'+req.ueser._id+'/assignedJobs');
    }
  }
}

module.exports= middlewareObject;
