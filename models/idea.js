import mongoose, { Schema, model, models } from "mongoose";

const IdeaSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  idea: {
    type: String,
    required: [true, "Idea is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
});

const Idea = models.Idea || model("Idea", IdeaSchema);

export default Idea;
