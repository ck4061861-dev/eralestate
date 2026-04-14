import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema(
  {
    parentProperty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    unitNumber: {
      type: String,
      required: true,
    },
    block: {
      type: String,
      default: '',
    },
    floorLevel: {
      type: String,
      default: '',
    },
    unitType: {
      type: String,
      enum: ['Apartment', 'Villa', 'Studio', 'Penthouse', 'Duplex'],
      default: 'Apartment',
    },
    currentStatus: {
      type: String,
      enum: ['Available', 'Rented', 'Sold', 'Booked', 'Reserved', 'Maintenance'],
      default: 'Available',
    },
    price: {
      type: Number,
      required: true,
    },
    areaSize: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      default: 0,
    },
    bathrooms: {
      type: Number,
      default: 0,
    },
    windows: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Unit', unitSchema);
