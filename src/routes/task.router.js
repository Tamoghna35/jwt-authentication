import express from 'express';
import { createTask, updateTask, deteteTask, getTask } from '../controllers/task.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.middleware.js';
const router = express.Router();

router.route('/adaTask').post(verifyJwt, createTask)
router.route('/updateTask').patch(verifyJwt, updateTask)
router.route('/deleteTask').delete(verifyJwt, deteteTask)
router.route('/getTask').get(getTask)

export default router;