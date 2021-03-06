const jwt = require('jsonwebtoken');

// Handlers
const accessHandler = require('../handlers/access');

module.exports = async (req, res, next) => {
  await jwt.verify(req.headers['x-access-token'], process.env.SECRET_KEY_FOR_JWT, (err, decoded) => {
    if (err) {
      return next();
    }

    if (!decoded) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.profile = decoded;
    const rules = JSON.parse(decoded.role.rules);
    for (const rule in rules) {
      rules[rule] = rules[rule].value;
    }
    req.rules = rules;

    accessHandler(req, decoded.role.slug);

    next();
  });
}
