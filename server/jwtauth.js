var jwt = require("jwt-simple");

module.exports = function(req,res,next){
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers["x-access-token"];
    if(token){
        try {
            var decoded_token = jwt.decode(token,app.get("jwtTokenSecret"));
            if(decoded_token.exp <= Date.now())
                res.redirect("/login.html");
            else if(decoded_token.iss === app.get("username"))
                return next();
            else
                res.redirect("/login.html");
        }
        catch (e){
            res.redirect("/login.html");
        }
    }
    else
        res.redirect("/login.html");
};