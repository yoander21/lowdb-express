import { Router } from "express";
import { count, getTask, updateTasks, deleteTasks, createTask, firstRoute, getTasks } from "../controller/task.controller.js";

const router = Router()



router.get("/", firstRoute);

router.get("/tasks",getTasks);
router.get("/tasks/:id",getTask);

router.get("/count",count);

router.post("/tasks",createTask);

router.delete("/tasks/:id",deleteTasks);

router.put("/tasks/:id",updateTasks);

// router.delete("/tasks/",count);

export default router;