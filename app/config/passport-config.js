const {Strategy, ExtractJwt} = require('passport-jwt');
const passport = require('passport');
require('dotenv').config();
const secret = process.env.SECRET || 'some other secret as default';
const mongoose = require('mongoose');
const User = require('../db/model/User');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};
//this sets how we handle tokens coming from the requests that come
// and also defines the key to be used when verifying the token.
module.exports =
passport.use(
    new Strategy(opts, (payload, done) => {
      User.findById(payload.id)
          .then(user => {
              if(user){
                return done(null, {
                    id: user.id,
                    name: user.name,
                    email: user.email
                });
              }
              return done(null, false);
           }).catch(err => console.error(err));
    })
  );
