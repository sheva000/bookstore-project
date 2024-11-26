//Import the JSON Web Token library
const jwt = require('jsonwebtoken'); 

//Secret key for verifying JWTs
const JWT_SECRET = process.env.JWT_SECRET_KEY 

//Middleware to verify if the request is made by an authorized user (admin)
const verifyAdmin = (req, res, next) => {
    //Extract the token from the 'Authorization' header
    const token = req.headers['authorization']?.split(' ')[1]

    //Verifying the token's validity
    if(!token){
        //Error message if the token is invalid
        return res.status(401).json({ message: "Access denied "})
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            return res.status(403).json({ message: "Invalid credentials"})
        }
        //Attach the decoded user information to the request object
        req.user = user
        //Proceed to the next middleware or route handler
        next()
    })
}

module.exports = verifyAdmin