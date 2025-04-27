# Program Penghitung BMI dengan Validasi Input
print("=== PROGRAM PENGHITUNG BMI ===")

# Input berat badan (kg) dan tinggi badan (m)
berat = float(input("Masukkan berat badan (kg): "))
tinggi = float(input("Masukkan tinggi badan (m): "))

# Validasi input
if berat <= 0 or tinggi <= 0:
    print("Error: Berat dan tinggi harus lebih besar dari 0.")
else:
    # Hitung BMI
    bmi = berat / (tinggi * tinggi)

    # Tentukan kategori BMI
    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif 18.5 <= bmi < 25:
        kategori = "Berat badan normal"
    elif 25 <= bmi < 30:
        kategori = "Berat badan berlebih"
    else:
        kategori = "Obesitas"

    # Tampilkan hasil
    print(f"\nBMI Anda: {bmi:.2f}")
    print(f"Kategori BMI: {kategori}")