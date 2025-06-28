const { Schema, model } = require("mongoose");

const TaskSchema = new Schema(
  {
    user: {
      id: { type: Number, required: true },
      email: { type: String, required: true },
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "DONE"],
      default: "TODO",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", TaskSchema);

module.exports = Task;
