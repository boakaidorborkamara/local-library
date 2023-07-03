const { Sequelize, DataTypes, UUID } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Author = sequelize.define("Author", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FamilyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATEONLY
    },
    date_of_death: {
        type: DataTypes.DATEONLY
    },
}, {
    tableName: 'author'
});


// //create author table from model
(async() => {
    await Author.sync({ alter: true });
    console.log("The table for the Author model was just (re)created!");
})();



module.exports = Author;