import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
});

export default sequelize;