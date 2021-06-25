const { request, response } = require('express');

const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');

const fileUpload = async (req = request, res = response) => {
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

const updateImage = async (req = request, res = response) => {
  const { collection, id } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no user with id ${id}`,
        });
      }
      break;

    case 'products':
      model = await Product.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `There is no prodcut with id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({ msg: 'I forgot to validate this' });
  }

  const name = await uploadFile(req.files, undefined, collection);
  model.img = name;

  await model.save();

  return res.json(model);
};

module.exports = {
  fileUpload,
  updateImage,
};
