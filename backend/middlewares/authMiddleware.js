const jwt= require('jsonwebtoken');
const User = require('../models/User');

//Middleware to protect routes
const protect = async (req, res, next) => {
    try{
        let token=req.headers.authorization;
        if(token && token.startsWith('Bearer')){
            token = token.split(' ')[1]; // Extract the token from the header
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            req.user = await User.findById(decoded.id).select('-password'); // Get user details without password
            next(); // Proceed to the next middleware or route handler
        }
        else{
            res.status(401).json({ message: 'Not authorized, no token' }); // Unauthorized if no token is provided
        }
    }
    catch(error){
        res.status(401).json({ message: 'Token failed' , error: error.message}); // Unauthorized if token verification fails
    }
};

module.exports = { protect }; // Export the protect middleware
// This middleware checks for a valid JWT token in the request headers and retrieves the user information from