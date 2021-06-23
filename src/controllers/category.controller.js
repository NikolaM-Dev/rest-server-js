const { request, response } = require('express');
const { Category } = require('../models');

const getCategories = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.body;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query)
      .populate('user', { name: 1 })
      .skip(Number(since))
      .limit(Number(limit)),
  ]);

  return res.json({ total, categories });
};

const getCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', { name: 1 });

  if (category.state === false)
    return res
      .status(404)
      .json({ msg: 'Category does not exist in the database' });

  return res.json(category);
};

const createCategory = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });

  if (categoryDB)
    return res.status(400).json({
      msg: `The category ${categoryDB.name} already exists`,
    });

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Category(data);
  await category.save();

  return res.status(201).json(category);
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  const category = await Category.findByIdAndUpdate(id, data, {
    new: true,
  }).populate('user', { name: 1 });

  return res.json({ category });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  ).populate('user', { name: 1 });

  return res.json(category);
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
