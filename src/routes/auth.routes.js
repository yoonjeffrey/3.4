const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

// Route to initiate Google OAuth login
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route after Google authentication
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  (req, res) => {
    // If successful, generate JWT token
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, name: req.user.name },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '1h' }
    );
    
    // Redirect to frontend with token in query params (or you can send a JSON response)
    // For now, redirecting to frontend running on HTTPS port 5173
    res.redirect(`https://localhost:5173/?token=${token}`);
  }
);

module.exports = router;
