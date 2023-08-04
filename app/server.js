const express = require('express');
const app = express();
const PORT = process.env.PORT || 4001;
module.exports = app;

const apiRouter = require('./server/api');
app.use('/api', apiRouter);


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});