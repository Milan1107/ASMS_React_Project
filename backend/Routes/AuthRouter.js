const express = require('express');
const router = express.Router();
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation.js'); // Import validation middleware
const {signup,login} = require("../Controlers/AuthControler.js");
const authenticateJWT = require('../Middleware/authMiddleware.js');

// Signup route
router.post('/signup', signupValidation, (req, res) => {
    // Placeholder for signup logic
    signup(req,res)
});

// Login route
router.post('/login', loginValidation, (req, res) => {
    // Placeholder for login logic
    login(req,res);
});

router.get('/profile', authenticateJWT, (req, res) => {
    // res.json({ 
    //     message: "This is a protected route!", 
    //     user: req.user 
    // });
    const {authorization} = req.headers;
    if(!authorization){
        return res.
            status(422).
            json({error:"You must be login tocken not given"});

    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(tocken,process.env.JWT_SECRET,(err,payload))
});


// router.post('/login', login);

// Protected route
router.get('/protected', authenticateJWT, (req, res) => {
    res.status(200).json({ 
        message: "You are authorized!", 
        user: req.user 
    });
});
module.exports = router;