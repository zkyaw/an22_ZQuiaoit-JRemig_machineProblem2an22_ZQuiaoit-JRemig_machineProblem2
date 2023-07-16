// BSCS Source Code Template for 3T AY 2022-2023
/*
	Program:    E-commerce API
	Programmer: Zildjian Amos G. Quiaoit & Emmanuel Jazon C. Remig
	Section:    AN22
	Start Date: July 16, 2023 
	End Date:   July 16, 2023 
*/

// This file store the methods for creaating jsonwbtokens
const jwt = require('jsonwebtoken');
const secret = 'bcsAN22';

module.exports.createAccessToken = (user) => {
	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	};
	// Generate a JSON web token using the jwt's sign method
	// Generate the token using the form data and the secret code
	return jwt.sign(data, secret, {})
};

module.exports.verify = (req, res, next) => {
  const token = req.headers.authorization;

  if (typeof token !== 'undefined') {
    jwt.verify(token.slice(7), secret, (err, data) => {
      if (err) {
        res.status(401).json({ error: 'Token verification failed' });
      } else {
        req.user = data;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Access denied' });
  }
};

module.exports.decode = (token) => {
  if (typeof token !== 'undefined') {
    try {
      return jwt.decode(token.slice(7), { complete: true }).payload;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
};