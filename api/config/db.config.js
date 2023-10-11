module.exports = {
    HOST: "db",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "postgres",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30010,
      idle: 10000
    }
};