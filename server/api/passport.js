import passportLocal from 'passport-local';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './models/';
import config from '../../config/project.config';


const debug = require("debug")("api:passport:strategy");

var LocalStrategy = passportLocal.Strategy;

export default function configPassport(passport) {
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    debug("deserializing user %s", id);
    User.findById(id).then( (user) => {
      user.uid = user.id;
      done(null, user);
    }).catch((err) => {
      done(err);
    });
  });

  const cookieExtractor = (req) => {
    // redux auth stores in cookie, authorization header won't be sent from direct api calls
    if (req.cookies && req.cookies.authHeaders) {
      let jwt;
      try {
        jwt = JSON.parse(req.cookies.authHeaders);
      } catch(e) {
        return false;
      }
      return jwt['access-token'];
    }
  }
  const extractors = [ ExtractJwt.fromAuthHeaderWithScheme('Bearer'), cookieExtractor ];

  passport.use('jwt', new Strategy({
    secretOrKey:    config.api_secret,
    jwtFromRequest: ExtractJwt.fromExtractors(extractors) },
    (payload, done) => {
      User.findById(payload.id).then(user => {
        if (user) {
          return done(null, {
            email: user['email'],
            id: user['id']
          });
        } else {
          return done(new Error("User not found"), null);
        }
      });
    }
  ));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email-sign-up-email',
    passwordField: 'email-sign-up-password',
    passReqToCallback: true},
    (req, email, password, done) => {
      User.findByEmail(email)
        .then(user => {
          if (user[0]) {
            done(null, false);
          } else {
            let newUser = new User({
              email: email,
              password: User.generateHash(password),
            });
            return newUser.save();
          }
        }).then(newUser => {
          // TODO: refactor this
          if (newUser) {
            done(null, newUser);
          }
        });
    }
  ));
  //
  // passport.use('local-login', new LocalStrategy({
  //   usernameField:'email',
  //   passwordField:'password',
  //   passReqToCallback: true},
  //   (req, email, password, done) => {
  //     User.findByEmail(email)
  //       .then(user => {
  //         if(!user){
  //           done(null, false);
  //         }
  //         if(!user.validPassword(password)){
  //           done(null, false);
  //         }
  //         done(null, user);
  //       }).catch(err => {
  //         done(err);
  //       });
  //   }
  // ));
  //
  User.getAll().then(users => {
    users.forEach(function(user) {
      debug('user %s', user.email);
    });
  });
}
