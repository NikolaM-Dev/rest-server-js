const Role = require('../models/role.model');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists)
    throw new Error(`Role ${role} is not registered in the database`);
};

module.exports = {
  isValidRole,
};
