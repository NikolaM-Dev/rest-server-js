const { request, response } = require('express');

const {
  searchUser,
  searchCategory,
  searchProduct,
} = require('../helpers/searchCollections');

const search = (req = request, res = response) => {
  const allowedCollections = ['users', 'categories', 'products', 'roles'];
  const { collection, term } = req.params;

  if (!allowedCollections.includes(collection))
    return res.status(400).json({
      msg: `Collection ${collection} is not allowed - Allowed collections ${allowedCollections}`,
    });

  const SEARCH_HANDLERS = {
    users: () => searchUser(term, res),
    categories: () => searchCategory(term, res),
    products: () => searchProduct(term, res),
    default: () => res.status(500).json({ msg: 'Talk to the administrador' }),
  };

  return SEARCH_HANDLERS[collection]
    ? SEARCH_HANDLERS[collection]()
    : SEARCH_HANDLERS.default;
};

module.exports = { search };
