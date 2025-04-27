
export type BookStatus = 'owned' | 'reading' | 'wishlist';

export interface Book {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  coverUrl?: string;
  notes?: string;
  addedAt: string;
}

export interface BookContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'addedAt'>) => void;
  updateBook: (id: string, book: Partial<Omit<Book, 'id' | 'addedAt'>>) => void;
  deleteBook: (id: string) => void;
  getBookById: (id: string) => Book | undefined;
  filteredBooks: Book[];
  setStatusFilter: (status: BookStatus | 'all') => void;
  statusFilter: BookStatus | 'all';
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
