const { request, response } = require('express');

const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/googleVerify');

const login = async (req = request, res = response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json('Email or Password are not correct - email');

    if (!user.state)
      return res.status(400).json('Email or Password are not correct - state');

    const validPassword = await User.comparePassword(password, user.password);

    if (!validPassword)
      return res
        .status(400)
        .json('Email or Password are not correct - password');

    // jwt generated
    const token = await generateJWT(user.id);

    return res.json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const googleUser = await googleVerify(id_token);
    console.log(googleUser);

    return res.json({
      msg: 'Hi, from google signin',
      googleUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      msg: 'Google token is not valid',
    });
  }
};

module.exports = {
  login,
  googleSignin,
};
