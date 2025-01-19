
import bcrypt from 'bcryptjs';


// hashing password
// steps:
// 1. import bcryptjs
// 2. create a function called hashPassword
// 3 take user given password as argument
//4. declear sal round
//5.use bcrypt.hash to generate hash password
//6. return hash password

export const hashedPassword = async (password) => {
    try {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    } catch (error) {
        throw new Error(error)
    }
}


// compare password

// steps:
// 1. task two argument password and hash password
// 2. use bcrypt.compare to compare password
// 3. return true or false

export const comparePassword = async (user_inputPassword, hashed_password) => {
    try {
        return await bcrypt.compare(user_inputPassword, hashed_password)
    } catch (error) {
        throw new Error(error)
    }
}