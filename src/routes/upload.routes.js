const { Router } = require('express');
const { check } = require('express-validator');

const {
  fileUpload,
  updateImage,
  showImage,
} = require('../controllers/upload.controller');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.post('/', validateFile, fileUpload);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'ID is not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImage
);

router.get(
  '/:collection/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
