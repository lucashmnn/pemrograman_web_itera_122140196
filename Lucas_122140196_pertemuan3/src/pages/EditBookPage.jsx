
import React, { useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import Layout from '../components/Layout';
import { BookContext } from '../context/BookContext';

const EditBookPage = () => {
  const { id } = useParams();
  const { getBookById } = useContext(BookContext);

  // Komentar: Jika tidak ada parameter id, kembali ke halaman utama
  if (!id) {
    return <Navigate to="/" />;
  }

  // Komentar: Ambil data buku berdasarkan ID
  const book = getBookById(id);

  // Komentar: Jika buku tidak ditemukan, redirect ke halaman utama
  if (!book) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold mb-6">Edit Buku</h1>
        <BookForm book={book} isEditing />
      </div>
    </Layout>
  );
};

export default EditBookPage;

