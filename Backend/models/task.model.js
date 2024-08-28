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
    status:{
      type:String,
      required:true,
      enum:["Important", "Completed", "In-Progress"],
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("TaskManagement", TaskManagement);
