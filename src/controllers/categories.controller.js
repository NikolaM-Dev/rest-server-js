const { request, response } = require('express');
const { Category } = require('../models/');

const getCategories = async (req = request, res = response) => {
  res.json({
    msg: 'get All',
  });
};

const getCategory = async (req = request, res = response) => {
  res.json({
    msg: 'get One',
  });
};

const postCategory = async (req = request, res = response) => {
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

const putCategory = async (req = request, res = response) => {
  res.json({
    msg: 'put',
  });
};

const deleteCategory = async (req = request, res = response) => {
  res.json({
    msg: 'delete',
  });
};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
