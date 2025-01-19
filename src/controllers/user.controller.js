import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { generateRefreshToken, generateAccessToken } from '../utils/token_generator.js';
import { comparePassword, hashedPassword } from '../utils/password.js';


export const register = asyncHandler(async (req, res) => {
    const { user_name, email, password } = req.body;
    if (!user_name || !email || !password) {
        throw new ApiError(400, 'Please provide all the details');
    }
    const existeduser = await User.findOne({ where: { email } });
    if (existeduser) {
        throw new ApiError(400, 'User already exists');
    }
    const hashed_password = await hashedPassword(password);
    const user = await User.create({ user_name, email, password: hashed_password });
    if (!user) {
        throw new ApiError(400, 'User not created');
    }
    const { password: removepassword, ...restOftheUser } = user.toJSON();

    return res.status(201).json(new ApiResponse(201, restOftheUser));
})


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, 'Please provide all the details');
    }

    const existingUser = await User.findOne({ where: { email: email } });
    console.log("existingUser ===>", existingUser);

    if (!existingUser) {
        throw new ApiError(400, 'User not found with the credentials');
    }
    const isMatch = await comparePassword(password, existingUser.password);
    if (!isMatch) {
        throw new ApiError(400, 'Password not matched');
    }
    const accessToken = generateAccessToken(existingUser);
    if (!accessToken) {
        throw new ApiError(500, 'Access Token not generated');
    }
    const refreshToken = generateRefreshToken(existingUser);
    if (!refreshToken) {
        throw new ApiError(500, 'Refresh Token not generated');
    }
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, { existingUser, accessToken }, "Login successfully"))
})


export const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (!existingUser) {
        throw new ApiError(400, 'User not found with the credentials');
    }
    existingUser.refreshToken = null;
    await existingUser.save();
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, {}, 'Logout successfully'))


})
export const forgotPassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const { password } = req.body;
    const existeduser = await User.findOne({ where: { email: user.email } });

    if (!existeduser) {
        throw new ApiError(400, 'User not found with the credentials');
    }
    const hashed_password = await hashedPassword(password);
    existeduser.password = hashed_password;
    await existeduser.save();
    return res.status(200).json(new ApiResponse(200, {}, 'Password Reset successfully'))


})


export const resetPassword = asyncHandler(async (req, res) => {
    const user = req.user;
    const { password } = req.body;
    const existedUser = await User.findOne({ where: { email: user.email } });
    if (!existedUser) {
        throw new ApiError(400, 'User not found with the credentials');
    }
    const isMatch = await comparePassword(password, existedUser.password);
    if (!isMatch) {
        throw new ApiError(400, 'Password not matched');
    }
    const newPassword = hashedPassword(password);
    existedUser.password = newPassword;
    await existedUser.save();
    return res.status(200).json(new ApiResponse(200, {}, 'Password Reset successfully'))

})
export const accessTokenGenerator = asyncHandler(async (req, res) => {
    const incomingRefreshtoken =
        req.cookies.refreshToken || req.header("Authorization")?.split(" ")[1];
    if (!incomingRefreshtoken) {
        throw new ApiError(401, 'Unauthorized');
    }
    const decodedToken = jwt.verify(incomingRefreshtoken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findOne({ where: { email: decodedToken.email } });
    if (!user) {
        throw new ApiError(401, 'User not found with the credentials');
    }

    if (user.refreshToken !== incomingRefreshtoken) {
        throw new ApiError(401, 'refreshToken not matched');
    }
    const accessToken = generateAccessToken(user);
    if (!accessToken) {
        throw new ApiError(500, 'Access Token not generated');
    }

    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', incomingRefreshtoken, options)
        .json(new ApiResponse(200, { accessToken }, 'Access Token generated successfully'))

})

