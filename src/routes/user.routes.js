const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');
const { isValidRole } = require('../helpers/dbValidators');
const validateFields = require('../middlewares/validateFields');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and must be longer than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUser
);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;
