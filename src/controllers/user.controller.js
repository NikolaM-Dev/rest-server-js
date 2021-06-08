const { response, request } = require('express');

const User = require('../models/user.model');

const getUsers = async (_req = request, res = response) => {
  // const { name = 'No name', apiKey, page = 1, limit = 10 } = req.query;
  const users = await User.find({});
  return res.json({ users });
};

const getUser = (_req = request, res = response) => {
  res.json({ msg: 'get API - Controller' });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encrypting password
  user.password = await User.encryptPassword(user.password);

  await user.save();

  return res.status(201).json({ user });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, email, ...userData } = req.body;

  if (password) userData.password = await User.encryptPassword(password);
  const user = await User.findByIdAndUpdate(id, userData, { new: true });

  return res.json({ user });
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
