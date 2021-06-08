const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  img: { type: String },
  role: { type: String, required: true },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

UserSchema.statics.encryptPassword = async (password) => {
  const salt = bcryptjs.genSaltSync();
  return await bcryptjs.hashSync(password, salt);
};

UserSchema.statics.comparePassword = async (password, candidatePassword) => {};

module.exports = model('User', UserSchema);
