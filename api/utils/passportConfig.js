import passportLocal from 'passport-local';
import { User } from '../models/';

var LocalStrategy = passportLocal.Strategy;

export default function configPassport(passport) {
  passport.serializeUser( (user, done) => {
    done(null, user.id);
    return null;
  });

  passport.deserializeUser( (id, done) => {
    User.findOne(id).then( (user) => {
      done(null, user);
      return null;
    }).catch((err) => {
      done(err, user);
      return null;
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true},
    (req, email, password, done) => {
      process.nextTick(() => {
        User.findByEmail(email).then(user => {
          if(user){
            return null;
          }else{
            let newUser = User.create({
              email: email,
              password: User.generateHash(password),
            });
            return newUser.save();
          }
        }).then(newUser => {
          done(null, newUser);
          return null;
        }).catch(err => {
          console.log(`Err ${err}`);
          done(err);
          return null;
        });
      })
    }
  ));

  passport.use('local-login', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback: true},
    (req, email, password, done) => {
      User.findByEmail(email)
        .then(user => {
          if(!user){
            done(null, false);
            return null;
          }
          if(!user.validPassword(password)){
            done(null, false);
            return null;
          }
          done(null, user);
          return null;
        }).catch(err => {
          done(err);
          return null;
        });
    }
  ));
}
