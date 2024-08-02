const {
  createTask,
  editTask,
  getTask,
  deleteTask,
  getAllTask,
} = require("../controller/tasks");
const express = require("express");
const router = express.Router();

router.route("/alltasks").get(getAllTask);
router.route("/task").post(createTask);
router.route("/:id/edittask").put(editTask);
router.route("/:id").get(getTask).delete(deleteTask);

module.exports = router;
