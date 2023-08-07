const userRouter = require('express').Router();
module.exports = userRouter;

const  {createUser, createUserAddress}  = require('./queries');


//userRouter.get('/all', getAllProducts);
userRouter.post('/user', createUser);
userRouter.post('/address', createUserAddress);
