const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Product name is required'] },
  description: { type: String },
  price: { type: Number, required: [true, 'Price is required'] },
  stock: { type: Number, default: 0 },
  image: { type: String },
  category: { type: String },
  buyerName: { type: String },
  buyingDate: { type: Date, default: Date.now },
  warranty: { type: String, default: '12 months' },
  extendedWarranty: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
