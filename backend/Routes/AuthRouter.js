const router = require('express').Router();

// Login route
router.post('/login', (req, res) => {
    res.status(200).send("Login Success");
});

// Signup route
router.post('/signup', (req, res) => { // Fixed: Changed 'Signup' to 'signup' (case-sensitive)
    res.status(201).send("Signup Success");
});

module.exports = router;
