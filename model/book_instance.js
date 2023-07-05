const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');


const BookInstance = sequelize.define("BookInstance", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        require: true
    },
    imprint: {
        type: DataTypes.STRING,
    },
    available_date: {
        type: DataTypes.DATE,
        require: true
    },
    status: {
        type: DataTypes.STRING,
        require: true
    }
}, {
    tableName: 'book_instance'
});


//create author table from model
(async() => {
    await BookInstance.sync({ alter: true });
    console.log("The table for the Book Instance model was just (re)created!");
})();


module.exports = BookInstance;