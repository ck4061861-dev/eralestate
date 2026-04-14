import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    permissions: { type: mongoose.Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);
export default Role;
