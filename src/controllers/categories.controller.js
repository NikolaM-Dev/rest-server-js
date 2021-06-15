const { resquest, response } = require('express');

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
  res.json({
    msg: 'post',
  });
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
