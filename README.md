# Paket Kajian Jurnal Portable

Komponen ini menggunakan struktur e-modul interaktif untuk menyajikan hasil kajian jurnal tentang e-worksheet Liveworksheets berbasis etnosains pada materi ikatan kimia.

## Isi paket

- `src/modules/views/emodul.js`: struktur, progres, navigasi, galeri, dan evaluasi.
- `src/modules/data/review-content.js`: delapan bagian kajian, dokumentasi, dan soal cek pemahaman.
- `src/styles/emodul.css`: seluruh tampilan desktop, tablet, dan ponsel.
- `src/modules/icons.js`: ikon SVG yang digunakan komponen.
- `public/review-jurnal/`: gambar utama serta bukti GARUDA dan SINTA.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan Vite, biasanya `http://localhost:5173`.

Untuk memeriksa build produksi:

```bash
npm run build
npm run preview
```

## Memasang pada project Vite/JavaScript lain

1. Salin isi folder `src` dan `public` ke folder yang sama pada project tujuan.
2. Impor CSS dan fungsi e-modul pada entry point project:

```js
import './styles/emodul.css';
import { renderEmodul, bindEmodulEvents } from './modules/views/emodul.js';
```

3. Render komponen pada elemen aplikasi:

```js
const app = document.querySelector('#app');
app.innerHTML = renderEmodul();
bindEmodulEvents(app);
```

Pastikan halaman memiliki elemen berikut:

```html
<div id="app"></div>
```

## Mengganti isi

Edit `src/modules/data/review-content.js` untuk mengganti judul, tujuan, isi, refleksi, dokumentasi, atau pertanyaan cek pemahaman.

Nama class tetap memakai awalan `emodul-` agar tidak mudah bentrok dengan CSS project tujuan. Progres baca dan nilai evaluasi disimpan di `localStorage` browser dengan key `kajian-jurnal-progress-v1`.

## Catatan

Komponen tidak membutuhkan Firebase. Komponen menggunakan JavaScript ES Modules, CSS biasa, dan `localStorage`.
