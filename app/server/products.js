const productsRouter = require('express').Router();
module.exports = productsRouter;

const  {getAllProducts}  = require('../config/queries');


productsRouter.get('/all', getAllProducts);