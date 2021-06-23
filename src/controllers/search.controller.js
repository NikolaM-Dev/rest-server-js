const { request, response } = require('express');
const { isValidObjectId } = require('mongoose');

const { User, Category, Product } = require('../models');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

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

const search = (req = request, res = response) => {
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection))
    return res.status(400).json({
      msg: `The allowed collections are ${allowedCollections}`,
    });

  const SEARCH_HANDLERS = {
    users: searchUser(term, res),
    categories: () => {},
    products: () => {},
    default: () => res.status(500).json({ msg: 'Talk to the administrador' }),
  };

  return SEARCH_HANDLERS[collection] || SEARCH_HANDLERS.default;
};

module.exports = { search };
