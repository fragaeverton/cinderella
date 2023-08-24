const loginRouter = require('express').Router();
const passport = require('passport');
module.exports = loginRouter;


loginRouter.post("/signup",
    passport.authenticate("local-signup", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);

loginRouter.post("/pass",
    passport.authenticate("local-login", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);

loginRouter.post("/", (req, res, next) =>{ 
    passport.authenticate("local-login", { 
        successRedirect : "/api/user",
        failureFlash: true
    })(req, res, next) 
});

