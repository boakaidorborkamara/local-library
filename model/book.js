const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');
const Author = require('../model/author');


const Book = sequelize.define("Book", {
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
    summary: {
        type: DataTypes.STRING,
        require: true
    },
    isbn: {
        type: DataTypes.STRING,
        require: true
    },
    genre:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'book',
    timestamps:false
});


// Declear a one to one relationship between Book and Author with foreign key store in the source 
Book.belongsTo(Author,{
    allowNull:false,
    DataTypes:sequelize.UUIDV4
});  


//create author table from model
(async() => {
    await Book.sync({ force: true});
    console.log("The table for the Book model was just (re)created!");
})();


module.exports = Book;