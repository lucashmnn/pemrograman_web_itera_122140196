import math_operations as mo
from math_operations import celsius_to_fahrenheit, celsius_to_kelvin

# Menggunakan fungsi dari modul
print("=== PERHITUNGAN GEOMETRI ===")
sisi_persegi = 5
panjang_pp = 10
lebar_pp = 4
jari_jari = 7

# Persegi
print(f"Luas Persegi: {mo.luas_persegi(sisi_persegi)}")
print(f"Keliling Persegi: {mo.keliling_persegi(sisi_persegi)}")
      


# Persegi Panjang
print(f"Luas Persegi Panjang: {mo.luas_persegi_panjang(panjang_pp, lebar_pp)}")
print(f"Keliling Persegi Panjang: {mo.keliling_persegi_panjang(panjang_pp, lebar_pp)}")

# Lingkaran
print(f"Luas Lingkaran: {mo.luas_lingkaran(jari_jari):.2f}")
print(f"Keliling Lingkaran: {mo.keliling_lingkaran(jari_jari):.2f}")

print("\n=== KONVERSI SUHU ===")
celsius = 25
fahrenheit = 77
kelvin = 298.15

print(f"Celsius: {celsius}°C")
print(f"Fahrenheit: {celsius_to_fahrenheit(celsius)}°F")
print(f"Kelvin: {celsius_to_kelvin(celsius)}K")

print(f"Fahrenheit ke Celsius: {mo.fahrenheit_to_celsius(fahrenheit):.2f}°C")
print(f"Kelvin ke Celsius: {mo.kelvin_to_celsius(kelvin):.2f}°C")
print(f"Fahrenheit ke Kelvin: {mo.fahrenheit_to_kelvin(fahrenheit):.2f}K")
print(f"Kelvin ke Fahrenheit: {mo.kelvin_to_fahrenheit(kelvin):.2f}°F")