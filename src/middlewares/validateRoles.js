const { request, response } = require('express');

const isAdminRole = async (req = request, res = response, next) => {
  if (!req.user)
    return res.status(500).json({
      msg: 'You want to verify the relay without validating the token first',
    });

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE')
    return res.status(401).json({
      msg: `${name} is not an administrator - can not do this`,
    });

  next();
};

module.exports = isAdminRole;
