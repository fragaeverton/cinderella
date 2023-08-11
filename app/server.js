const express = require('express');
const app = express();

//Passport
const passport = require("passport")
const session = require("express-session");
const flash = require("connect-flash")
require("./config/auth")(passport)
app.use(
  session({
    secret: "cind3r3l4",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
);
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash("success_msg")
  res.locals.error_msg = req.flash("error_msg")
  next();
})


module.exports = app;
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.use(express.static('public'));

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
