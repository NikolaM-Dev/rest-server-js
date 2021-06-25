const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
  files,
  allowedExtensions = ['png', 'jpg', 'jpeg', 'gif'],
  dir = ''
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const fileData = file.name.split('.');
    const extension = fileData[fileData.length - 1];

    if (!allowedExtensions.includes(extension))
      return reject(
        `The extension ${extension} is not allowed - Allowed Extensions ${allowedExtensions}`
      );

    const finalName = `${uuidv4()}.${extension}`;
    const uploadPath = path.join(path.resolve('uploads'), dir, finalName);

    file.mv(uploadPath, (err) => {
      if (err) return reject(err);
      return resolve(finalName);
    });
  });
};

module.exports = {
  uploadFile,
};
