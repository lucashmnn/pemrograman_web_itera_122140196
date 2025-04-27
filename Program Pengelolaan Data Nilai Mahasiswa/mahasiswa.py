from tabulate import tabulate

# Program Pengelolaan Data Nilai Mahasiswa
print("=== PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ===")

# Data mahasiswa dalam list dictionary
mahasiswa = [
    {"nama": "Andi", "nim": "12345", "nilai_uts": 80, "nilai_uas": 90, "nilai_tugas": 75},
    {"nama": "Budi", "nim": "12346", "nilai_uts": 70, "nilai_uas": 85, "nilai_tugas": 80},
    {"nama": "Cici", "nim": "12347", "nilai_uts": 60, "nilai_uas": 70, "nilai_tugas": 65},
    {"nama": "Dedi", "nim": "12348", "nilai_uts": 50, "nilai_uas": 60, "nilai_tugas": 55},
    {"nama": "Eka", "nim": "12349", "nilai_uts": 40, "nilai_uas": 50, "nilai_tugas": 45},
]

# Hitung nilai akhir dan tentukan grade
for mhs in mahasiswa:
    nilai_akhir = (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])
    mhs["nilai_akhir"] = nilai_akhir
    if nilai_akhir >= 80:
        mhs["grade"] = "A"
    elif 70 <= nilai_akhir < 80:
        mhs["grade"] = "B"
    elif 60 <= nilai_akhir < 70:
        mhs["grade"] = "C"
    elif 50 <= nilai_akhir < 60:
        mhs["grade"] = "D"
    else:
        mhs["grade"] = "E"

# Siapkan data untuk ditampilkan dengan tabulate
data_tabel = [[mhs["nama"], mhs["nim"], f"{mhs['nilai_akhir']:.2f}", mhs["grade"]] for mhs in mahasiswa]
headers = ["Nama", "NIM", "Nilai Akhir", "Grade"]

# Tampilkan data dalam format tabel
print("\nData Mahasiswa:")
print(tabulate(data_tabel, headers=headers, tablefmt="grid"))

# Cari mahasiswa dengan nilai tertinggi dan terendah
nilai_tertinggi = max(mahasiswa, key=lambda x: x["nilai_akhir"])
nilai_terendah = min(mahasiswa, key=lambda x: x["nilai_akhir"])

print("\nMahasiswa dengan Nilai Tertinggi:")
print(f"Nama: {nilai_tertinggi['nama']}, NIM: {nilai_tertinggi['nim']}, Nilai Akhir: {nilai_tertinggi['nilai_akhir']:.2f}, Grade: {nilai_tertinggi['grade']}")

print("\nMahasiswa dengan Nilai Terendah:")
print(f"Nama: {nilai_terendah['nama']}, NIM: {nilai_terendah['nim']}, Nilai Akhir: {nilai_terendah['nilai_akhir']:.2f}, Grade: {nilai_terendah['grade']}")