const userRouter = require('express').Router();
module.exports = userRouter;

const  {createUser, createUserAddress, updateUser, deleteRow}  = require('./queries');


//userRouter.get('/all', getAllProducts);
userRouter.post('/', createUser);
userRouter.post('/address', createUserAddress);
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteRow)