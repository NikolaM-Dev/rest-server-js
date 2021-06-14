const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'The id_token is required').not().isEmpty(),
    validateFields,
  ],
  googleSignin
);

module.exports = router;
