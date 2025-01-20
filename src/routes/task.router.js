import express from 'express';
import { createTask, updateTask, deteteTask, getTask } from '../controllers/task.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.middleware.js';
import { isAdminRole, isTaskOwner, isAdminOrTaskOwner } from '../middlewares/accessControl.middleware.js';
const router = express.Router();

router.route('/adaTask').post(verifyJwt,isAdminRole, createTask)
router.route('/updateTask').patch(verifyJwt,isAdminOrTaskOwner, updateTask)
router.route('/deleteTask').delete(verifyJwt,isTaskOwner, deteteTask)
router.route('/getTask').get(getTask)

export default router;