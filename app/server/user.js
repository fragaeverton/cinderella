const userRouter = require('express').Router();
const passport = require('passport');
module.exports = userRouter;

const  {createUserAddress}  = require('../config/queries');

userRouter.post('/address', createUserAddress);
//userRouter.delete('/:id', deleteRow)

userRouter.get('/',  (req, res, next) => {
  res.json({ user: req.session.passport.user });
});


userRouter.put("/new-password",
    passport.authenticate("password-update", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);

userRouter.delete("/",
    passport.authenticate("delete-user", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);


