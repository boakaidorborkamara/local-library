const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Author = sequelize.define("Author", {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FamilyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: DataTypes.DATE
    },
    date_of_death: {
        type: DataTypes.DATE
    },
}, {
    tableName: 'author'
});


//create author table from model
(async() => {
    await Author.sync({ force: true });
    console.log("The table for the Author model was just (re)created!");
})();




module.exports = Author;