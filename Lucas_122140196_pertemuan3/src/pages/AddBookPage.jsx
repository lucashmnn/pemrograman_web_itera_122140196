
import React from 'react';
import BookForm from '../components/BookForm';
import Layout from '../components/Layout';

const AddBookPage = () => {
  // Komentar: Menampilkan form untuk menambah buku baru
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Tambah Buku Baru</h1>
        <BookForm />
      </div>
    </Layout>
  );
};

export default AddBookPage;

