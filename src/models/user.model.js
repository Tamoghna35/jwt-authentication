import sequelize from "../db/db.config.js";
import { DataTypes } from "sequelize";


export const User = sequelize.define(
    "User_Table",
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Provide valid email format"
                }
            }

        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        refreshToken: {
            type: DataTypes.STRING,
        }
    },
    {
        timestamps: true
    }
)