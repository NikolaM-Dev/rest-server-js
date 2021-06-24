const { request, response } = require('express');
const { uploadFile } = require('../helpers');

const fileUpload = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).json({ msg: 'No files were uploaded.' });

  try {
    const name = await uploadFile(req.files, undefined, 'imgs');
    return res.json({ name });
  } catch (err) {
    console.error({ err });
    return res.status(400).json({
      msg: err,
    });
  }
};

module.exports = {
  fileUpload,
};
