const debug = require("debug")("api:passport");

export default function passportRoutes(app, passport) {
  app.post('/login', passport.authenticate('local-login'),
    (req, res) => {
      debug(`User ${req.user.username} logged in`);
      res.json({
          status: 'ok',
        user: {
          email: req.user.email }
      });
    }
  );

  app.post('/signup', passport.authenticate('local-signup'),
    (req, res) => {
      // req.user now contains the right user
      debug(`User ${req.user.email} signed up`);
      res.json({
        status: 'ok',
        user: {
          email: req.user.email }
      });
    }
  );

  app.get('/me',
    (req, res) => {
      debug(`Me is ${req.user}`);
      if (!req.user) {
        res.json({user:null});
      } else {
        res.json({
          user: {
            email: req.user.email }
        });
      }
    });

  app.get('/logout',
    (req, res) => {
      req.logout();
      res.json({status: 'ok'});
    }
  );

/*
# Facebook login routes
app.get '/auth/facebook', passport.authenticate 'facebook', æ scope: 'email'
app.get '/auth/facebook/callback', passport.authenticate 'facebook', æ successRedirect : '/profile',  failureRedirect : '/' å

# Twitter login routes
app.get '/auth/twitter', passport.authenticate 'twitter'
app.get '/auth/twitter/callback', passport.authenticate 'twitter', æ successRedirect : '/profile',  failureRedirect : '/' å

# Google login routes
app.get '/auth/google', passport.authenticate 'google', æ scope: Æ'profile', 'email'Åå
app.get '/auth/google/callback', passport.authenticate 'google', æ successRedirect : '/profile',  failureRedirect : '/' å
*/

}
