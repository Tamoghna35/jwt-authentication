import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import moment from "moment";
// Task is only created by Admin
export const createTask = asyncHandler(async (req, res) => {
    const { task_name, category, priority, status, due_date, user_id } = req.body;
    
    if (!task_name || !category || !priority || !status || !due_date) {
        throw new ApiError(400, "All fields are required");
    }
    const formattedDueDate = moment(due_date, "DD-MM-YYYY").format("YYYY-MM-DD");
    const task = await Task.create({
        task_name,
        category,
        priority,
        status,
        due_date:formattedDueDate,
        user_id: user_id || req.user.user_id,
    });

    if (!task) {
        throw new ApiError(400, "Task not created");
    }
    return res
        .status(201)
        .json(new ApiResponse(201, task, "Task created successfully"));
});

// Task is updated by authenticated user or admin only
export const updateTask = asyncHandler(async (req, res) => {
    const { task_name, category, priority, status, due_date } = req.body;

    if (!task_name && !category && !priority && !status && !due_date) {
        throw new ApiError(400, "atleast one field required to update");
    }
    const formattedDueDate = moment(due_date, "DD-MM-YYYY").format("YYYY-MM-DD");

    const updatedTaskfields = {};
    if (task_name) {
        updatedTaskfields.task_name = task_name;
    }
    if (category) {
        updatedTaskfields.category = category;
    }
    if (priority) {
        updatedTaskfields.priority = priority;
    }
    if (status) {
        updatedTaskfields.status = status;
    }
    if (due_date) {
        updatedTaskfields.due_date = formattedDueDate;
    }

    const updatedTask = await Task.update(updatedTaskfields, {
        where: {
            user_id: req.user.user_id,
            task_name: task_name,
        },
    });

    if (updateTask === 0) {
        throw new ApiError(400, "Task not updated");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});

// Task is deleted by the task owner only
export const deteteTask = asyncHandler(async (req, res) => {
    // const user = req.user;
    const { task_name } = req.body;
    // console.log("user ===>", user);

    if (!task_name) {
        throw new ApiError(400, "Task name is required to delete");
    }
    const deletedTask = await Task.destroy({
        where: {
            user_id: req.user.user_id,
            task_name: task_name,
        },
    });

    if (deletedTask === 0) {
        throw new ApiError(400, "Task not deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
});

// free API anyOne can access
export const getTask = asyncHandler(async (_, res) => {
    const tasks = await Task.findAll({
        include: {
            model: User,
            attributes: ["user_name", "email"]
        }
    })
    if (!tasks) {
        throw new ApiError(400, "Tasks not found")
    }
    return res.status(200).json(new ApiResponse(200, tasks, 'Tasks retrieved successfully'));
});
