const { Sequelize, DataTypes, UUID } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');
const Author = require('../model/author');
const Genre = require('../model/genre');
// const BookInstance = require('../model/book_instance');



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
    }
}, {
    tableName: 'book',
    timestamps:false
});

 
// Declear a one to many relationship between Book and Author with foreign key store in Book table 
Author.hasMany(Book,{
    foreignKey:{
        allowNull:true
    }
});
Book.belongsTo(Author);  


// Declear a one to many relationship between Book and Genre with foreign key store in Book table 
Genre.hasMany(Book, {
    type:UUID,
    allowNull: true
});
Book.belongsTo(Genre);   


//create author table from model
(async() => {
    await Book.sync({ alter: true});
    console.log("The table for the Book model was just (re)created!");
})();


module.exports = Book;