const bcrypt = require('bcryptjs');
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] },
  img: { type: String },
  role: { type: String, required: true, default: 'USER_ROLE' },
  state: { type: Boolean, default: true },
  google: { type: Boolean, default: false },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

UserSchema.statics.encryptPassword = async (password) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return bcrypt.compareSync(password, receivedPassword);
};

module.exports = model('User', UserSchema);
