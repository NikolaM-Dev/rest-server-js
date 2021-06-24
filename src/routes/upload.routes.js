const { Router } = require('express');
const { check } = require('express-validator');

const { fileUpload } = require('../controllers/upload.controller');

const router = Router();

router.post('/', fileUpload);

module.exports = router;
