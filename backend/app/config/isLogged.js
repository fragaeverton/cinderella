module.exports = {
    isLogged: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg", "you must be logged in")
        res.redirect("/")
    }
}