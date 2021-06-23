const { response } = require('express');
const { isValidObjectId } = require('mongoose');

const { User, Category, Product } = require('../models');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const areAllowedCollections = (collection = '', res = response) => {
  if (!allowedCollections.includes(collection))
    return res.status(400).json({
      msg: `The allowed collections are ${allowedCollections}`,
    });
};

const searchUser = async (term = '', res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  return res.json({
    results: users,
  });
};

const searchCategory = async (term = '', res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({ name: regex, state: true }).populate(
    'user',
    { name: 1 }
  );

  return res.json({
    results: categories,
  });
};

const searchProduct = async (term = '', res = response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const product = await Product.findById(term);
    return res.json({
      results: product ? [product] : [],
    });
  }

  const regex = new RegExp(term, 'i');

  const products = await Product.find({ name: regex, state: true })
    .populate('category', { name: 1 })
    .populate('user', { name: 1 });

  return res.json({
    results: products,
  });
};

module.exports = {
  areAllowedCollections,
  searchCategory,
  searchProduct,
  searchUser,
};
