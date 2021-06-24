const path = require('path');
const { request, response } = require('express');

const fileUpload = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
    return res.status(400).json({ msg: 'No files were uploaded.' });

  const { file } = req.files;

  const uploadPath = path.join(__dirname, '../../uploads/', file.name);

  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).json({ err });

    return res.json({ msg: 'File uploaded to ' + uploadPath });
  });
};

module.exports = {
  fileUpload,
};
