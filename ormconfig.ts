import "dotenv/config";

module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: true,
  logging: false,
  autosync: true,
  entities: ["./src/models/**/*.ts"],
  migrations: ["./src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
    entitiesDir: "./src/models",
  },
};