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

const haveRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user)
      return res.status(500).json({
        msg: 'You want to verify the relay without validating the token first',
      });

    if (!roles.includes(req.user.role))
      return res
        .status(401)
        .json({ msg: `This service requires one of these roles ${roles}` });

    next();
  };
};

module.exports = { isAdminRole, haveRole };
