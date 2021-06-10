const { request, response } = require('express');

const login = (req, res = reponse) => {
  res.json({ msg: 'Login ok' });
};

module.exports = {
  login,
};
