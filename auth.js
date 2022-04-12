const jwtSecret = 'your_jwt_secret'; //same kay used in JWTStrategy!

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); //local passport file

let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //the username being encoded in the JWT
    expiresIn: '7d', //token will expire in 7days
    algorithm: 'HS256', //the algorithm used to encode the values of the JWT
  });
};

//POST login
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
};
