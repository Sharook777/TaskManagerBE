import mongoose from "mongoose";

const { Schema } = mongoose;

const schema = new Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const model = mongoose.model("Tasks", schema);

export default model;
