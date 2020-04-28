const passport            = require("passport");
const LocalStrategy       = require("passport-local").Strategy;
const accountManager      = require("../models/account_manager"),
      freelanceRecruiters	= require('../models/freelance_recruiters');

function SessionConstructor(username, userGroup, details) {
  this.username = username;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports =
  function(passport){
    passport.serializeUser(function (userObject, done) {
      // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
      let userGroup = "accountManagers";
      let userPrototype =  Object.getPrototypeOf(userObject);

      if (userPrototype === accountManager.prototype) {
        userGroup = "accountManagers";
      } else if (userPrototype === freelanceRecruiters.prototype) {
        userGroup = "freelanceRecruiters";
      }

      let sessionConstructor = new SessionConstructor(userObject.username, userGroup, '');
      done(null,sessionConstructor);
    });

    passport.deserializeUser(function (sessionConstructor, done) {

      if (sessionConstructor.userGroup == 'accountManagers') {
        accountManager.findOne({
            username: sessionConstructor.username
        }, '-localStrategy.password', function (err, manager) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, manager);
          });
      } else if (sessionConstructor.userGroup == 'freelanceRecruiters') {
        freelanceRecruiters.findOne({
            username: sessionConstructor.username
        }, '-localStrategy.password', function (err, recruiter) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, recruiter);
        });
      }
    });

  passport.use('manager', new LocalStrategy(async (username,password,done)=>{
    try{
      // console.log("here")
      let manager= await accountManager.findOne({username: username});
      if(manager===null){
        done(null,false);
      }else{
        let valid = await manager.comparePassword(password,manager.password);
        // console.log(valid)
        if(valid)
          done(null,manager)
        else{
          done(null,false);
        }
      }
    }catch(err){
      console.log(err);
      done(err);
    }
  }))

  passport.use('recruiter', new LocalStrategy(async(username,password,done)=>{
    try{
      // console.log("recruiter local: "+username);
      let recruiter= await freelanceRecruiters.findOne({username: username})
      if(recruiter!==null){
        // console.log("here");
        let valid = await recruiter.comparePassword(password,recruiter.password);
        // console.log(valid)
        if(valid)
          done(null,recruiter)
        else
          done(null,false);

      }else{
        done(null,false);
      }
    }catch(err){
      console.log(err);
      done(err)
    }
  }));
}
