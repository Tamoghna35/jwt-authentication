import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";
import { User } from "./user.model.js";
export const Task = sequelize.define(
    "Task_Taable",
    {
        task_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM,
            values: ["WORK", "HOME", "LEARNING"],
            allowNull: false
        },
        priority: {
            type: DataTypes.ENUM,
            values: ["HIGH", "MEDIUM", "LOW"],
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ["TODO", "IN_PROGRESS", "COMPLETED"],
            allowNull: false
        },
        due_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "user_id"
            },
            onDelete: "CASCADE"
        }

    },
    { timestamps: true }
);