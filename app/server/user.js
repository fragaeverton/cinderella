const userRouter = require('express').Router();
const passport = require('passport');
const {isLogged} = require('../config/isLogged')
module.exports = userRouter;

const  {createUserAddress}  = require('../config/queries');

userRouter.post('/address', isLogged, createUserAddress);
//userRouter.delete('/:id', deleteRow)

userRouter.get('/', isLogged, (req, res, next) => {
  res.json({ user: req.session.passport.user });
});


userRouter.put("/new-password", isLogged,
    passport.authenticate("password-update", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);

userRouter.delete("/", isLogged,
    passport.authenticate("delete-user", { session: true }),
    (req, res, next) => {
      res.json({ user: req.user });
    }
);


