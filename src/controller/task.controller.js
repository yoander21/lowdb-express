import { v4 } from "uuid";
import { getConnection } from "../database.js";

export const createTask = async (req, res) => {
    const newTask = {
        id: v4(),
        task: req.body.task,
        description: req.body.description,
    };

    try {
        const db = getConnection();

        db.data.tasks.push(newTask);

        await db.write();

        res.json(newTask);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

export const getTask = (req, res) => {
    const taskfind = getConnection().data.tasks.find(
        (task) => task.id === req.params.id
    );
    if (!taskfind) return res.sendStatus(404);
    res.json(taskfind);
};

export const firstRoute = (req, res) => {
    res.send("sending task");
};

export const deleteTasks = async (req, res) => {
    const db = getConnection();
    const tasksFound = db.data.tasks.find((t) => t.id === req.params.id);
    if (!tasksFound) return res.sendStatus(404);

    const newTasks = db.data.tasks.filter((t) => t.id !== req.params.id);
    db.data.tasks = newTasks;

    await db.write();
    const message = "deleting";
    res.json(tasksFound);
};

export const updateTasks = async (req, res) => {
    const newTask = {
        task: req.body.task,
        description: req.body.description,
    };
    const db = getConnection();
    const tasksFound = db.data.tasks.find((t) => t.id === req.params.id);
    if (!tasksFound) return res.sendStatus(404);
    tasksFound.task = req.body.task
    tasksFound.description = req.body.description
    db.data.tasks.map(t => t.id === req.params.id ? tasksFound : t)

    res.json(tasksFound);

    await db.write()

};
export const getTasks = (req, res) => {
    const db = getConnection();
    res.json(db.data.tasks);
};

export const count = (req, res) => {
    const count = getConnection().data.tasks.length;
    res.json(count);
};
