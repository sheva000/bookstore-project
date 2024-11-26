// Import Express.js framework
const express = require('express');

// Import the User model for admin authentication
const User = require('./userModel'); 

// Import the JSON Web Token library
const jwt = require('jsonwebtoken'); 

// Create an Express router instance
const router = express.Router(); 

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET_KEY; 


// Route to authenticate an admin user
router.post("/admin", async (req, res) => {
    
    // Extract username and password from the request body
    const { username, password } = req.body; 

    try {
        // Look up the admin user in the database by username
        const admin = await User.findOne({ username });

        // If the admin user is not found, respond with a 404 error
        if (!admin) {
            res.status(404).send({ message: "Admin not found" });
        }

        // If the provided password does not match, respond with a 401 error
        if (admin.password !== password) {
            res.status(401).send({ message: "Invalid password" });
        }

        // Generate a JWT for the authenticated admin
        const token = jwt.sign(
            {
                id: admin._id, // Admin ID
                username: admin.username, // Admin username
                role: admin.role // Admin role
            },
            JWT_SECRET, // Use the secret key to sign the token
            { expiresIn: "1h" } // Set the token to expire in 1 hour
        );

        // Respond with the token and admin details
        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        // Log and handle errors during admin authentication
        console.error("Failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin" });
    }
});

module.exports = router
