import { logger } from "../logger/logger";
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { migrate } from "../migrations/index";

dotenv.config();

const sequelize = new Sequelize(process.env.database_connection!, {
  logging: (msg) => logger.info(msg),
});

export default sequelize;

export async function init() {
  await sequelize.authenticate();
  await sequelize.sync();
  await migrate();
}
