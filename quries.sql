CREATE TABLE IF NOT EXIST book(
    id INTERGER AUTOINCREMENT PRIMARY KEY NOT NULL,
    title STRING ,
    summary STRING N,
    isbn STRING,
    url STRING,
    author_id INTEGER,
    genre_id INTEGER


    FOREIGN_KEY(author_id)
       REFERENCES(author.author_id)

    FOREIGN_KEY(genre_id)
        REFERENCES(genre.genre_id)
)