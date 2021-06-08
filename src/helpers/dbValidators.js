const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists)
    throw new Error(`Role ${role} is not registered in the database`);
};

const emailExists = async (email = '') => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error(`Email ${email} already exists`);
};

const userExistById = async (_id) => {
  const userExists = await User.findById(_id);
  if (!userExists) throw new Error(`ID ${_id} does not exist`);
};

module.exports = {
  isValidRole,
  emailExists,
  userExistById,
};
