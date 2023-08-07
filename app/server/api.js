const express = require('express');
const apiRouter = express.Router();

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

 
module.exports = apiRouter;
