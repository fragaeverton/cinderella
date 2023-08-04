const express = require('express');
const apiRouter = express.Router();

const shoesRouter = require('./shoes');
apiRouter.use('/shoes', shoesRouter);
 
module.exports = apiRouter;
