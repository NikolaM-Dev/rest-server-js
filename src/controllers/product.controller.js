const { request, response } = require('express');
const { Product } = require('../models');

const getProducts = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.body;
  const query = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', { name: 1 })
      .populate('category', { name: 1 })
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  return res.json({ total, products });
};

const getProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate('user', { name: 1 })
    .populate('category', { name: 1 });

  if (product.state === false)
    return res
      .status(404)
      .json({ msg: 'Product does not exist in the database' });

  return res.json(product);
};

const createProduct = async (req = request, res = response) => {
  const { state, user, ...body } = req.body;
  const productDB = await Product.findOne({ name: body.name });

  if (productDB)
    return res.status(400).json({
      msg: `Prodcut ${productDB.name} already exists`,
    });

  const data = {
    name: body.name.toUpperCase(),
    user: req.user._id,
    ...body,
  };

  const product = new Product(data);
  await product.save();

  return res.status(201).json(product);
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.name) data.name = data.name.toUpperCase();

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, {
    new: true,
  })
    .populate('user', { name: 1 })
    .populate('category', { name: 1 });

  return res.json(product);
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  )
    .populate('user', { name: 1 })
    .populate('category', { name: 1 });

  return res.json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
