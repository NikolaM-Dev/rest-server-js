const validateFields = require('./validateFields');
const validateJWT = require('./validateJWT');
const validateRoles = require('./validateRoles');
const validateFile = require('./validateFile');

module.exports = {
  ...validateFields,
  ...validateFile,
  ...validateJWT,
  ...validateRoles,
};
