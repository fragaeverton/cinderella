const loginRouter = require('express').Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
module.exports = loginRouter;



passport.use(new LocalStrategy(
    function(username, password, done){
        db.users.findByUsername(username, (err, user)=>{
        if(err) return done(err);

        if(!user) return done(null, false)

        if(user.password != password) return done(null, false)

        return done(null, user)
        })
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Look up user id in database. 
    db.users.findById(id, function (err, user) {
      if (err) return done(err); 
      done(null, user);
    });
});

loginRouter.post("/",
  passport.authenticate("insertStrategyHere", { failureRedirect : "/insertPathHere"}),
  (req, res) => {
    res.redirect("profile");
  }
);

loginRouter.get("/profile", (req, res) => {
    res.render("insertDashboardNameHere", { user: req.user });
}); 