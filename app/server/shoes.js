const shoesRouter = require('express').Router();
module.exports = shoesRouter;

shoesRouter.get('/', (req, res) => {
    res.send('Hello World!');
});