import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: '',
    },
    paymentType: {
      type: String,
      enum: ['RENT', 'DEPOSIT', 'MAINTENANCE', 'OTHER'],
      default: 'RENT',
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    received: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      default: new Date().toLocaleDateString(),
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'PARTIAL'],
      default: 'PENDING',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);
