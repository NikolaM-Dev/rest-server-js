const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
  let { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  return res.json({ total, users });
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
  const { password, google, email, _id, ...user } = req.body;

  if (password) user.password = await User.encryptPassword(password);
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

  return res.json({ user: updatedUser });
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
