
import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import BookCard from './BookCard';

const BookList = () => {
  const { filteredBooks } = useContext(BookContext);

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-muted-foreground text-lg mb-2">No books found</h3>
        <p className="text-sm text-muted-foreground">Try adding a new book or adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
