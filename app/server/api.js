const express = require('express');
const apiRouter = express.Router();

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const userRouter = require('./user');
apiRouter.use('/user', userRouter);

const orderRouter = require('./orders');
apiRouter.use('/orders', orderRouter);
 
module.exports = apiRouter;
