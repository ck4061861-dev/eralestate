import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    propertyType: { type: String, trim: true, default: '' },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    coverImageId: { type: String, required: false, default: "" },
    images: [
      {
        filename: String,
        contentType: String,
        fileId: String,
      },
    ],
    available: { type: Boolean, default: true },
    createdBy: { type: String, default: "admin" },
    agent: {
      agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", default: null },
      agentName: { type: String, trim: true, default: "" },
      agentPhone: { type: String, trim: true, default: "" },
      agentEmail: { type: String, trim: true, default: "" },
      agentExperience: { type: Number, default: 0 },
      agentStatus: { type: String, default: "Active" },
      agentSpecialization: { type: String, trim: true, default: "" },
    },
    agentName: { type: String, trim: true, default: "" },
    agentPhone: { type: String, trim: true, default: "" },
    features: [{ type: String, trim: true }],
    amenities: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
