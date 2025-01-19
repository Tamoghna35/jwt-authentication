import express from 'express';
import { register, loginUser, logoutUser, forgotPassword, resetPassword, accessTokenGenerator } from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.middleware.js';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyJwt, logoutUser);
router.route('/forgot-password').post(verifyJwt, forgotPassword);
router.route('/reset-password').post(verifyJwt, resetPassword);
router.route('/access-token').post(accessTokenGenerator);

export default router;