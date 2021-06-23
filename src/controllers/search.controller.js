const { request, response } = require('express');
const {
  areAllowedCollections,
  searchUser,
  searchCategory,
  searchProduct,
} = require('../helpers/searchCollections');

const search = (req = request, res = response) => {
  const { collection, term } = req.params;
  areAllowedCollections(collection, res);

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
