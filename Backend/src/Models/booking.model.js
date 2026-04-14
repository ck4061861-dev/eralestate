import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    propertyTitle: {
      type: String,
      required: true,
    },
    property: {
      type: String,
      default: '',
    },
    unit: {
      type: String,
      default: '',
    },
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      default: '',
    },
    agent: {
      type: String,
      default: 'Unassigned',
    },
    visitDate: {
      type: Date,
      required: true,
    },
    visitTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
    notes: {
      type: String,
      default: '',
    },
    createdBy: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
