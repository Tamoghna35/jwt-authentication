import sequelize from "../db/db.config.js";
import { User } from "./user.model.js";
import { Task } from "./task.model.js";

User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        sequelize.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export {
    connectDB
}