import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    unit: {
      type: String,
    },
    customer: {
      name: String,
      email: String,
      phone: String,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contractType: {
      type: String,
      enum: ['RENTAL AGREEMENT', 'LEASE AGREEMENT', 'PURCHASE AGREEMENT'],
      default: 'RENTAL AGREEMENT',
    },
    status: {
      type: String,
      enum: ['Draft', 'Active', 'Completed', 'Terminated'],
      default: 'Draft',
    },
    amount: {
      type: Number,
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ['Monthly', 'Quarterly', 'Yearly'],
      default: 'Monthly',
    },
    securityDeposit: Number,
    lateFee: Number,
    startDate: Date,
    endDate: Date,
    additionalNotes: String,
    documents: [
      {
        filename: String,
        filepath: String,
        url: String,
        contentType: String,
        size: Number,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;
