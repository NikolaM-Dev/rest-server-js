const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', [check('email', 'Email is not valid').isEmail()], postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);

module.exports = router;
