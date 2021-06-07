const { response, request } = require('express');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
  const { name = 'No name', apiKey, page = 1, limit = 10 } = req.query;

  res.json({ msg: 'get API - Controller', name, apiKey, page, limit });
};

const getUser = (_req = request, res = response) => {
  res.json({ msg: 'get API - Controller' });
};

const postUser = async (req = request, res = response) => {
  const body = req.body;
  const user = new User(body);
  await user.save();

  res.status(201).json({ user });
};

const putUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ msg: 'put API - Controller', id });
};

const deleteUser = (req = request, res = response) => {
  const { id } = req.params;

  res.json({ msg: 'delete API - Controller', id });
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
