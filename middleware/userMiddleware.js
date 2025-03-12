const jwt = require("jsonwebtoken")

function userMiddleware(req, res, next){
    
    const auth = req.headers.authorization;
    
    if(auth){
        const token = auth.split(" ")[1];

        try{
            var decoded = jwt.verify(token, process.env.JWT_SECRET);
        }
        catch(e){
            res.status(403).json({
                "msg" : "Invalid JWT"
            })
            return;
        }

        
        if(decoded){
            req.body.id = decoded.id;
            req.body.phoneNumber = decoded.phoneNumber;

            next();
        }
        else{
            res.status(403).json({
                "msg" : "Invalid JWT"
            })
        }
    }
    else{
        res.status(403).json({
            "msg" : "No auth token found"
        })
    }
    
}

module.exports = userMiddleware
