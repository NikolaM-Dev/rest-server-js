const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

const router = Router();

// public
router.get('/', [validateFields], getCategories);

// public
router.get('/:id', [validateFields], getCategory);

// haveRole
router.post('/', [validateFields], postCategory);

// haveRole
router.put('/:id', [validateFields], putCategory);

// Admin
router.delete('/:id', [validateFields], deleteCategory);

module.exports = router;
