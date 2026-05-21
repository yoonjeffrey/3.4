import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';

const router = express.Router();

// oauth login
router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// oauth callback
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  (req, res) => {
    // generate jwt
    const token = jwt.sign(
      { id: req.user.id, email: req.user.email, name: req.user.name },
      process.env.JWT_SECRET || 'secreto_super_seguro',
      { expiresIn: '1h' }
    );
    
    // redirect to frontend with token
    res.redirect(`https://localhost:5173/?token=${token}`);
  }
);

export default router;
