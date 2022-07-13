const Sequelize = require('sequelize');

//create a new database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './libraryDB.db'
});


// verify if connection is successful 
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
};



module.exports = Sequelize;