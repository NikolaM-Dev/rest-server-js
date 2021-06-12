const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json('Email or Password are not correct - email');

    if (!user.state)
      return res.status(400).json('Email or Password are not correct - state');

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res
        .status(400)
        .json('Email or Password are not correct - password');

    return res.json({ email, password });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

module.exports = {
  login,
};
