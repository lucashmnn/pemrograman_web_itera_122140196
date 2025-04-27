
# Koleksi Buku Saya

## Deskripsi Aplikasi
Aplikasi ini adalah katalog koleksi buku pribadi berbasis web menggunakan React. Pengguna dapat menambah, mengedit, menghapus, memfilter, dan melihat statistik buku yang dimiliki, sedang dibaca, atau ingin dimiliki.

## Instruksi Instalasi dan Menjalankan

1. **Kloning repository**
   ```sh
   git clone &lt;URL_REPO_ANDA&gt;
   cd &lt;NAMA_FOLDER_REPO&gt;
   ```

2. **Install dependensi**
   ```sh
   npm install
   ```

3. **Jalankan aplikasi**
   ```sh
   npm run dev
   ```
   Setelah berhasil dijalankan, buka [http://localhost:5173](http://localhost:5173) di browser.

## Penjelasan Fitur React yang Digunakan

- **Context API:** Untuk menyimpan dan mengelola data koleksi buku secara global menggunakan `BookContext`.
- **React Hook:** Seperti `useState`, `useEffect`, dan custom hook (`useLocalStorage`, `useBookStats`).
- **React Router:** Untuk navigasi antar halaman (Home, Tambah Buku, Edit Buku, Statistik, 404).
- **Komponen Modular:** Setiap fitur seperti Daftar Buku, Formulir Buku, Filter, dikelola dalam file komponen sendiri.
- **Local Storage:** Data buku tersimpan secara lokal pada browser agar tetap tersedia saat aplikasi dimuat ulang.
- **Tailwind CSS & shadcn/ui:** Digunakan untuk membuat tampilan responsif dan konsisten.

## Komentar Pada Kode

Komentar tersedia pada bagian kode penting di file sumber untuk memudahkan pemahaman dan pengembangan lebih lanjut.

---

**Seluruh teks dan instruksi di aplikasi telah diterjemahkan ke Bahasa Indonesia.**

