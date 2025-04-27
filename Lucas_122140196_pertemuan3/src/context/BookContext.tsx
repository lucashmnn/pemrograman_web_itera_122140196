
import { createContext, useState, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { Book, BookContextType, BookStatus } from '../types/book';

export const BookContext = createContext<BookContextType>({
  books: [],
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  getBookById: () => undefined,
  filteredBooks: [],
  setStatusFilter: () => {},
  statusFilter: 'all',
  searchTerm: '',
  setSearchTerm: () => {},
});

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [statusFilter, setStatusFilter] = useState<BookStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter((book) => {
    const matchesStatus = statusFilter === 'all' || book.status === statusFilter;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const addBook = (bookData: Omit<Book, 'id' | 'addedAt'>) => {
    const newBook: Book = {
      ...bookData,
      id: uuidv4(),
      addedAt: new Date().toISOString(),
    };
    
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const updateBook = (id: string, updatedData: Partial<Omit<Book, 'id' | 'addedAt'>>) => {
    setBooks((prevBooks) => 
      prevBooks.map((book) => 
        book.id === id ? { ...book, ...updatedData } : book
      )
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const getBookById = (id: string): Book | undefined => {
    return books.find((book) => book.id === id);
  };

  return (
    <BookContext.Provider value={{
      books,
      addBook,
      updateBook,
      deleteBook,
      getBookById,
      filteredBooks,
      setStatusFilter,
      statusFilter,
      searchTerm,
      setSearchTerm,
    }}>
      {children}
    </BookContext.Provider>
  );
};
