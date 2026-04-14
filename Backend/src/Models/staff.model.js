import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    role: { type: String, default: 'Staff', trim: true },
    bio: { type: String, default: '', trim: true },
    image: { type: String, default: '👨‍💼', trim: true },
    expertise: [{ type: String, trim: true }],
    salary: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
