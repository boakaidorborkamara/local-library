const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Genre = sequelize.define("Genre", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'genre'
});


//create author table from model
(async() => {
    await Genre.sync({ force: false });
    console.log("The table for the Genre model was just (re)created!");
})();




module.exports = Genre;