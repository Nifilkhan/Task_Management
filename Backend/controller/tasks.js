const asyncHandler = require("express-async-handler");
const TaskModel = require("../models/task.model");
const constants = require("../constants");

/**
 * @desc create a new task
 * @route /task
 * @access public
 */

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, taskDescription, status, taskDueDate } = req.body;

    if (!title || !taskDescription || !status || !taskDueDate) {
      res.status(500);
      throw new Error("undefined value");
    }
    const task = await TaskModel.create({
      title,
      taskDescription,
      taskDueDate,
      status
    });
    res.status(200).json({ task });
  } catch (err) {
    console.log(err, "Task not created");
    res.status(404).json({ message: "Issue found" });
  }
});

/**
 * @desc get the task
 * @route /:id
 * @access public
 */
const getTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: "tasks", task });
});

/**
 * @desc get all the task
 * @route /alltask
 * @access public
 */

const getAllTask = asyncHandler(async (req, res) => {
  try {
  const { status } = req.body;

  if (status) {
    const tasks = await TaskModel.find({ status }).sort({ createdAt:-1 });
    res.status(200).json({ message: "Tasks found", tasks });
    
  } else {
    const tasks = await TaskModel.find().sort({ createdAt:-1 });
    res.status(200).json({ message: "All tasks found", tasks });
  }
}catch(error){
  console.log(error, "Task not found");
  res.status(404).json({ message: "Issue found",error:error.message });
}
});

/**
 * @desc update the task
 * @route /:id/edittask
 * @access public
 */

const editTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task Not Found");
  }

  const UpdateTask = await TaskModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(UpdateTask);
});

/**
 * @desc delet the task
 * @route /:id/taskdelet
 * @route public
 */

const deleteTask = asyncHandler(async (req, res) => {
  const task = await TaskModel.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new error("error happend");
  }
  await TaskModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "Task deleted successfully", task });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).send("Task not found");
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = {
  createTask,
  editTask,
  getTask,
  deleteTask,
  getAllTask,
  updateStatus,
};
