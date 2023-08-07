const express = require('express');
const apiRouter = express.Router();

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const loginRouter = require('./login');
apiRouter.use('/login', loginRouter);

 
module.exports = apiRouter;
