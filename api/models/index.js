const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Setting up the connection to the database
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,  // NOTE: Consider removing this if using a newer version of Sequelize

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importing the models
db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.phones = require("./phone.model.js")(sequelize, Sequelize);

// Setting up the associations between models
db.phones.belongsTo(db.contacts, { foreignKey: 'contactId' }); 
db.contacts.hasMany(db.phones, { foreignKey: 'contactId' });

module.exports = db;
