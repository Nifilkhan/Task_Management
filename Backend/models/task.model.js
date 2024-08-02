const mongoose = require("mongoose");

const TaskManagement = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
    },
    taskDescription: {
      type: String,
      required: [true, "title description required"],
    },
    taskDueDate: {
      type: String,
      required: [true, "task due date required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("TaskManagement", TaskManagement);
