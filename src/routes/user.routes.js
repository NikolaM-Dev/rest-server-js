const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const {
  isValidRole,
  emailExists,
  userExistById,
} = require('../helpers/dbValidators');

const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/validateJWT');
const { haveRole } = require('../middlewares/validateRoles');

const router = Router();

router.get('/', getUsers);

router.get(
  '/:id',
  [check('id').isMongoId(), check('id').custom(userExistById), validateFields],

  getUser
);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and must be longer than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUser
);

router.put(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    haveRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id').isMongoId(),
    check('id').custom(userExistById),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
