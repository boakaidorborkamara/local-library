const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');


const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING,
        require: true
    },
    summary: {
        type: DataTypes.STRING,
        require: true
    },
    isbn: {
        type: DataTypes.STRING,
        require: true
    },
    genre:{
        type: DataTypes.ARRAY(DataTypes.TEXT)
    }
}, {
    tableName: 'book'
});


//create author table from model
(async() => {
    await Book.sync({ force: true });
    console.log("The table for the Book model was just (re)created!");
})();


module.exports = Book;