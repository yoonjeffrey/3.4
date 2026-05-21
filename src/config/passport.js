import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '../models/index.js';

const { User } = db;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://localhost:3003/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (!user) {
        if (profile.emails && profile.emails.length > 0) {
          user = await User.findOne({ where: { email: profile.emails[0].value } });
        }

        if (user) {
          user.googleId = profile.id;
          await user.save();
        } else {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            password: null
          });
        }
      }

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;
