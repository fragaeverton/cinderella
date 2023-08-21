const productsRouter = require('express').Router();
module.exports = productsRouter;

const  {getAllProducts,getProduct,createProduct,updateProduct, deleteRow}  = require('../config/queries');


productsRouter.get('/:id', getProduct);
productsRouter.get('/', getAllProducts);
productsRouter.put('/:id', updateProduct);
productsRouter.post('/', createProduct);
productsRouter.delete('/:id', deleteRow);