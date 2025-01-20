import { Task } from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";

export const isAdminRole = (req, _, next) => { 
    const user = req.user;
    console.log("user ===>", user);
    console.log("user.isAdmin ===>", user.isAdmin);
    
    
    if (!user.isAdmin) {
        throw new ApiError(403, "Only Admin can create Task");
    }
    next();
};

export const isTaskOwner = async(req, _, next) => { 
    const user = req.user;
    const { task_name } = req.body;
    
    const task = await Task.findOne({
        where: {
            user_id: user.user_id,
            task_name: task_name,
        },
    });
    console.log("task ===>", task);
    
    console.log("req.user ===>", req.user.user_id);
    console.log("task.user_id ===>", task.user_id);

    if (!task) {
        throw new ApiError(404, "Task not found for the user");
    }


    

    if(user.user_id !== task.user_id) {
        throw new ApiError(403, "only the taskOwner can update the task");
    }
    req.task = task;
    next();
};


export const isAdminOrTaskOwner = async(req, _, next) => { 
    const user = req.user;
    const { task_name } = req.body;
    const task = await Task.findOne({
        where: {
            user_id: user.user_id,
            task_name: task_name,
        },
    });

    if (!task) {
        throw new ApiError(404, "Task not found for the user");
    }

    if (!user.isAdmin && user.user_id !== task.user_id) {
        throw new ApiError(403, "only admin or the taskOwner can update the task");
    }
    req.task = task;
    next();
};