import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    propertyTitle: { type: String },
    amount: { type: String },
    status: { type: String, enum: ['NEW', 'CONTACTED', 'REPLIED', 'CLOSED'], default: 'NEW' },
  },
  { timestamps: true }
);

export default mongoose.model('Inquiry', inquirySchema);
