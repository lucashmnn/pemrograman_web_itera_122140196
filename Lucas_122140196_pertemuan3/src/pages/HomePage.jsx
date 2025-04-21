
import React, { useContext } from 'react';
import BookFilter from '../components/BookFilter';
import BookList from '../components/BookList';
import Layout from '../components/Layout';
import { BookContext } from '../context/BookContext';

const HomePage = () => {
  const { books } = useContext(BookContext);

  // Menghitung jumlah buku dan membuat label jumlah buku dalam bahasa Indonesia
  const getLabelJumlahBuku = (jumlah) => {
    if (jumlah === 0) return "Belum ada buku dalam koleksi Anda";
    if (jumlah === 1) return "1 buku dalam koleksi Anda";
    return `${jumlah} buku dalam koleksi Anda`;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Koleksi Buku Saya</h1>
          <p className="text-muted-foreground">
            {getLabelJumlahBuku(books.length)}
          </p>
        </div>
        <BookFilter />
        <BookList />
      </div>
    </Layout>
  );
};

export default HomePage;

