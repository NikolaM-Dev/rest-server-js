const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists)
    throw new Error(`Role ${role} is not registered in the database`);
};

const emailExists = async (email = '') => {
  const userEmail = await User.findOne({ email });
  if (userEmail) throw new Error(`Email ${email} already exists`);
};

module.exports = {
  isValidRole,
  emailExists,
};
