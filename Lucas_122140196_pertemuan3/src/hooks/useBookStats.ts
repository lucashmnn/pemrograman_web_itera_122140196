
import { useContext, useMemo } from 'react';
import { BookContext } from '../context/BookContext';

interface BookStats {
  total: number;
  owned: number;
  reading: number;
  wishlist: number;
  recentlyAdded: {
    id: string;
    title: string;
  }[];
}

const useBookStats = (): BookStats => {
  const { books } = useContext(BookContext);
  
  return useMemo(() => {
    const stats: BookStats = {
      total: books.length,
      owned: books.filter(book => book.status === 'owned').length,
      reading: books.filter(book => book.status === 'reading').length,
      wishlist: books.filter(book => book.status === 'wishlist').length,
      recentlyAdded: books
        .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
        .slice(0, 5)
        .map(book => ({ id: book.id, title: book.title }))
    };
    
    return stats;
  }, [books]);
};

export default useBookStats;
