import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    commissionType: { type: String, enum: ['Percentage', 'Fixed'], default: 'Percentage' },
    commissionValue: { type: Number, default: 0 },
    experience: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    specialization: { type: String, default: '' },
  },
  { timestamps: true }
);

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
