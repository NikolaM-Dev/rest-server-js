const dbValidators = require('./dbValidators');
const generateJWT = require('./generateJWT');
const googleVerify = require('./googleVerify');
const searchCollections = require('./searchCollections');
const uploadFile = require('./uploadFile');

module.exports = {
  ...dbValidators,
  ...generateJWT,
  ...googleVerify,
  ...searchCollections,
  ...uploadFile,
};
