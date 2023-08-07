const userRouter = require('express').Router();
module.exports = userRouter;

const  {createUser, createUserAddress}  = require('./queries');


//userRouter.get('/all', getAllProducts);
userRouter.post('/user', createUser);
<<<<<<< HEAD
userRouter.post('/address', createUserAddress);

=======
userRouter.post('/address', createUserAddress);
>>>>>>> f3ec8b851d91c9d25ef3f00c056479760d16ae10
