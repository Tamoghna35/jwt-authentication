// 1. from cookies or authentication heder take token
// 2. Decode the token by using jwt.verify() method
// 3. CHECK IF THE USER WITH DECODED TOKEN IUS PRESENT OR NOT

// 4. if not throw error
// 5. if user is present asigne the user to the requested user and  then call next() method

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
    const token =
        req.cookies.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findOne({ where: { email: decodedToken.email } });
    if (!user) {
        throw new ApiError(401, "User not found with thw credentials");
    }
    // const { password, refreshToken, ...rest } = user.toJSON();
    req.user = user;
    next();
});
