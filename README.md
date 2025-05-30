# Persebaran Universitas di Indonesia - WebGIS
Nama : Tasya Zahrani
NPM : 2308107010006
Mata Kuliah : Sistem Informasi Geografis

## 📍 Deskripsi
Proyek ini adalah WebGIS sederhana berbasis Leaflet.js yang menampilkan persebaran universitas di seluruh Indonesia.
Data lokasi universitas diambil dari OpenStreetMap (OSM) menggunakan query Overpass Turbo dan diolah dalam format GeoJSON.

Aplikasi ini bertujuan untuk:
- Memberikan informasi lokasi universitas secara interaktif.
- Menunjukkan potensi penggunaan open data untuk visualisasi spasial.
- Menjadi dasar pengembangan sistem informasi pendidikan berbasis peta.

## 🗂️ Struktur Proyek 
```
/WebGIS-Universitas
  ├── css                          # Halaman utama WebGIS
    ├── style.css
  ├── data                         # Styling peta dan halaman
    ├── datauniversity.geojson
  ├── js                           # Script Leaflet dan load GeoJSON
    ├── script.js
  └── index.html                   # Data GeoJSON universitas
```

## 🔧 Teknologi yang Digunakan 
- HTML5 - Struktur dasar halaman
- CSS3 - Styling sederhana
- JavaScript (Vanilla JS) - Untuk scripting peta
- Leaflet.js - Library open-source untuk peta interaktif
- OpenStreetMap (OSM) - Sumber data lokasi universitas

## 📈 Fitur
- Menampilkan peta seluruh Indonesia.
- Menandai lokasi universitas dengan titik interaktif.
- Popup nama universitas saat marker diklik.
- Ringan dan mudah diakses dari berbagai perangkat.

## 📌 Catatan 
Data yang digunakan adalah data crowdsourced dari komunitas OpenStreetMap dan mungkin terdapat ketidaksempurnaan. Validasi tambahan disarankan untuk keperluan resmi.

Dapat juga dilihat di github melalui link berikut ini https://github.com/tasyazahrani/TasyaZahrani_WebGIS_Leaflet.git 

(c) 2025 - tasyazahrani
