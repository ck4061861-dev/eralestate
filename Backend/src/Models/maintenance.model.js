import mongoose from 'mongoose';

const maintenanceSchema = new mongoose.Schema(
  {
    property: {
      type: String,
      required: true,
    },
    issueDescription: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
      default: 'MEDIUM',
    },
    requester: {
      type: String,
      required: true,
    },
    requesterEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Maintenance', maintenanceSchema);
