const { User, Role, Category, Product } = require('../models/');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists)
    throw new Error(`Role ${role} is not registered in the database`);
};

const emailExists = async (email = '') => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error(`Email ${email} already exists`);
};

const userExistById = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) throw new Error(`ID ${id} does not exist`);
};

const categoryExistsById = async (id) => {
  const categoryExists = await Category.findById(id);
  if (!categoryExists) throw new Error(`ID ${id} does not exist`);
};

const productExistsById = async (id) => {
  const productExists = await Product.findById(id);
  if (!productExists) throw new Error(`ID ${id} does not exist`);
};

module.exports = {
  categoryExistsById,
  emailExists,
  isValidRole,
  productExistsById,
  userExistById,
};
