import mongoose from 'mongoose';

const ownerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, default: 'Individual', trim: true },
    taxId: { type: String, trim: true, default: '' },
    propertiesCount: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

const Owner = mongoose.model('Owner', ownerSchema);
export default Owner;
