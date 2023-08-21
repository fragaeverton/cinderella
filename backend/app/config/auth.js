const LocalStrategy = require("passport-local").Strategy;
const { emailExists, matchPassword, findById, createUser, updatePassword, deleteUser} = require("./helper");


module.exports = function(passport){

    passport.use("local-login", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const user = await emailExists(email);
                if (!user) return done(null, false);
                const isMatch = await matchPassword(password, user.password);
                if (!isMatch) return done(null, false);
                return done(null, {id: user.id, email: user.email});
            } catch (error) {
                return done(error, false);
            }
        }
    ));

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const userExists = await emailExists(email)        
                if (userExists) {
                    return done(null, false);
                }        
                const user = await createUser(email, password);
                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    ));
  
    passport.use("password-update", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await emailExists(email);
                if (!user) return done(null, false);
                const isMatch = await matchPassword(password, user.password);
                if (!isMatch) return done(null, false);
                const update = await updatePassword(email, req.body.newPassword);
                if (!update) return done(null, false);
                return done(null, {id: user.id, email: user.email});
            } catch (error) {
                done(error);
            }
        }
    ));
  
    passport.use("delete-user", new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        async (email, password, done) => {
            try {
                const user = await emailExists(email);
                if (!user) return done(null, false);
                const isMatch = await matchPassword(password, user.password);
                if (!isMatch) return done(null, false);
                const update = await deleteUser(email);
                if (!update) return done(null, false);
                return done(null, {id: user.id, email: user.email});
            } catch (error) {
                done(error);
            }
        }
    ));
  
    passport.serializeUser((user, done) => {
        done(null, user.id);        
    });
  
    passport.deserializeUser( async function(id, done){
        // Look up user id in database.
        const foundUser = await findById(id) 
        if (!foundUser) {
            return done("error");
        }
        done(null, foundUser);
    });
  
}
