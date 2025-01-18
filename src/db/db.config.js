import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DATABASE_NAME, // Correct order: database name first
    process.env.DB_USERNAME,   // then username
    process.env.DB_PASSWORD,   // then password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        }
    }
);

export default sequelize;