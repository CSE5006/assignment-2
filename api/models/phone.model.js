module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        // DEFINE YOUR MODEL HERE
    
        name: {
            type: Sequelize.STRING,
        },
        number: {
            type: Sequelize.STRING,
        },
        contactId: {
            type: Sequelize.INTEGER,
            references: {
            model: "contacts",
            key: "id",
            },
        },
    });
  
    return Phone;
  };
  