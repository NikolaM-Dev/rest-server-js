const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
  validateJWT,
  haveRole,
  isAdminRole,
} = require('../middlewares');
const {
  getCategories,
  getCategory,
  deleteCategory,
  createCategory,
  updateCategory,
} = require('../controllers/category.controller');
const { categoryExistsById } = require('../helpers/dbValidators');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  getCategory
);

router.post(
  '/',
  [
    validateJWT,
    haveRole('USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    haveRole('USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'The name is required').not().isEmpty(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryExistsById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
