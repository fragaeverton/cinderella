const productsRouter = require('express').Router();
module.exports = productsRouter;

const  {getAllProducts}  = require('./queries');


productsRouter.get('/all', getAllProducts);