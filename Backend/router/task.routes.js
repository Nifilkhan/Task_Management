const {
  createTask,
  editTask,
  getTask,
  deleteTask,
  getAllTask,
  updateStatus
} = require("../controller/tasks");
const express = require("express");
const router = express.Router();

router.route("/alltasks").post(getAllTask);
router.route("/task").post(createTask);
router.route("/edittask/:id").put(editTask);
router.route("/tasks/:id").get(getTask).delete(deleteTask).put(updateStatus);

module.exports = router;
