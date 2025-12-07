import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    summary: { type: String, required: true, trim: true, maxlength: 500 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    tags: [{ type: String, trim: true, maxlength: 100 }],
    thumbnail: { type: String, trim: true },
    media: [
      {
        type: { type: String, enum: ["image", "video"], required: true },
        src: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

// Prevent recompiling model in dev
export default models.Project || model("Project", ProjectSchema);
