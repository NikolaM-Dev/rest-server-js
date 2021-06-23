const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
  validateJWT,
  haveRole,
  isAdminRole,
} = require('../middlewares');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const {
  productExistsById,
  categoryExistsById,
} = require('../helpers/dbValidators');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
  ],
  getProduct
);

router.post(
  '/',
  [
    validateJWT,
    haveRole('USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'ID is not valid').isMongoId(),
    check('category').custom(categoryExistsById),
    validateFields,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID is not valid').isMongoId(),
    haveRole('USER_ROLE', 'ADMIN_ROLE', 'SALES_ROLE'),
    check('id').custom(productExistsById),
    validateFields,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productExistsById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
