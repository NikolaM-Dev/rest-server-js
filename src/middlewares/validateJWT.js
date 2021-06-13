const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token)
    return res.status(401).json({ msg: 'There is no token in the request' });

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
    req.uid = uid;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      msg: 'Token is not valid',
    });
  }
};

module.exports = { validateJWT };
