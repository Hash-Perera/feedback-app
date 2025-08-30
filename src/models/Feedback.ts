import { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    mobile: { type: String, trim: true, maxlength: 100 },
    email: { type: String, trim: true },
    projectName: { type: String, trim: true },
    feedback: { type: String, required: true, maxlength: 2000 },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Prevent recompiling model in dev
export default models.Feedback || model("Feedback", FeedbackSchema);
