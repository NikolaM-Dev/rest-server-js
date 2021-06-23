const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
  name: { type: String, required: [true, 'Name is required'], unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  state: { type: Boolean, required: true, default: true },
  price: { type: Number, default: 0 },
  description: { type: String, default: '' },
  available: { type: Boolean, default: true },
});

ProductSchema.methods.toJSON = function () {
  const { __v, state, ...product } = this.toObject();
  return product;
};

module.exports = model('Product', ProductSchema);
