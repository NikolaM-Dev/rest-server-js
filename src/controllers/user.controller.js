const { request, response } = require('express');
const User = require('../models/user.model');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, since = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit)),
  ]);

  return res.json({ total, users });
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user.state === false)
    return res
      .status(404)
      .json({ error: 'User does not exist in the database' });

  return res.json(user);
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encrypting password
  user.password = await User.encryptPassword(user.password);

  await user.save();

  res.status(201).json({ user });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, google, email, _id, ...user } = req.body;

  if (password) user.password = await User.encryptPassword(password);
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

  return res.json({ user: updatedUser });
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });

  return res.json(user);
};

module.exports = {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
