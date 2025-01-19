//generate accessToken using jwt
// 1. take the entire user as argument
// 2. Define payload by name, email and access
// 3. use jwt.sign to generate token
// 4. return token
import jwt from 'jsonwebtoken'


export const generateAccessToken = (user) => {
    try {
        const payload = {
            name: user.user_name,
            email: user.email,
            access: user.isAdmin
        }
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
    } catch (error) {
        throw new Error(error)
    }
}


export const generateRefreshToken = (user) => {
    try {
        const payload = {
            name: user.user_name,
            email: user.email,
            access: user.isAdmin
        }
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
    } catch (error) {
        throw new Error(error)
    }
}
