const path = require('path');
const fs = require('fs');

const { request, response } = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

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

  if (model.img) {
    const imagePath = path.join(path.resolve('uploads'), collection, model.img);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  try {
    const name = await uploadFile(req.files, undefined, collection);
    model.img = name;

    await model.save();

    return res.json(model);
  } catch (err) {
    console.error({ err });
    return res.status(400).json({
      msg: err,
    });
  }
};

const showImage = async (req = request, res = response) => {
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

  if (model.img) {
    const imagePath = path.join(path.resolve('uploads'), collection, model.img);

    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
  }
  const imagePath = path.join(__dirname, '../../public/assets/no-image.jpg');

  return res.sendFile(imagePath);
};

const updateImageCloudinary = async (req = request, res = response) => {
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

  if (model.img) {
    const arrName = model.img.split('/')
    const name = arrName[arrName.length - 1]
    const [ public_id ] = name.split('.')

    cloudinary.uploader.destroy(public_id)
  }

  const { tempFilePath } = req.files.file;
  const { secure_url }= await cloudinary.uploader.upload(tempFilePath);

  try {
    model.img = secure_url;

    await model.save()

    return res.json(model);
  } catch (err) {
    console.error({ err });
    return res.status(400).json({
      msg: err,
    });
  }
};

module.exports = {
  fileUpload,
  showImage,
  updateImage,
  updateImageCloudinary,
};
