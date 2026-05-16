import mongoose from "mongoose";

const navPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["buy", "rent", "let"],
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} },
    updatedBy: { type: String, default: "admin", trim: true },
  },
  { timestamps: true }
);

const NavPage = mongoose.model("NavPage", navPageSchema);
export default NavPage;
