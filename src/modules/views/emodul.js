import { icon } from '../icons.js';
import { reviewChapters as chapters, reviewDocumentation as documentation } from '../data/review-content.js';

const STORAGE_KEY = 'kajian-jurnal-progress-v1';

const legacyChapters = [
  {
    id: 'pengenalan', number: '01', kicker: 'Orientasi', title: 'Mengenal Lughati Arabic', duration: '8 menit', image: 2,
    objective: 'Menjelaskan tujuan, pengguna, dan ruang lingkup multimedia pembelajaran Lughati Arabic.',
    body: `
      <p><strong>E-Modul Pengembangan Multimedia Pembelajaran Lughati Arabic</strong> merupakan panduan untuk mempelajari proses analisis, perancangan, pengembangan, implementasi, pengujian, dan publikasi aplikasi pembelajaran Bahasa Arab berbasis Progressive Web App (PWA).</p>
      <div class="emodul-note"><strong>Sasaran modul:</strong> mahasiswa, guru, dan pengembang media pembelajaran. Modul ini membahas proses pengembangan produk; materi Bahasa Arab di dalam aplikasi digunakan sebagai contoh implementasi.</div>
      <p>Produk yang dikembangkan menyatukan materi, mufrodat, muhadatsah, audio pelafalan, kuis formatif, tugas, rapor, dan pemantauan pembelajaran untuk siswa sekolah menengah.</p>
      <div class="emodul-role-grid">
        <article><span class="emodul-role-icon">ط</span><h3>Peserta Didik</h3><p>Mempelajari materi, berlatih kosakata dan percakapan, mengerjakan kuis serta tugas, lalu meninjau progres.</p></article>
        <article><span class="emodul-role-icon">م</span><h3>Guru</h3><p>Mengelola kelas dan konten, menyusun course, memberikan penilaian, remedial, dan memantau ketuntasan.</p></article>
      </div>
      <h3>Mengapa produk ini dikembangkan?</h3>
      <p>Pembelajaran bahasa Arab membutuhkan keterhubungan antara teks, bunyi, makna, contoh penggunaan, latihan, dan evaluasi. Media interaktif memberi kesempatan belajar mandiri sekaligus menyediakan umpan balik langsung.</p>`,
    task: 'Sebutkan tiga kebutuhan belajar bahasa Arab yang dijawab oleh aplikasi ini.',
    caption: 'Gambaran umum tampilan dan identitas Lughati Arabic.'
  },
  {
    id: 'persiapan', number: '02', kicker: 'Preparation', title: 'Persiapan Sistem Pengembangan', duration: '10 menit', image: 5,
    objective: 'Mengidentifikasi perangkat, aplikasi, akun layanan, dan lingkungan kerja yang diperlukan sebelum pengembangan.',
    body: `
      <p>Sebelum mulai mengembangkan media, pastikan perangkat dan layanan berikut tersedia. Periksa kesiapannya lebih dahulu agar proses instalasi, pengujian, dan publikasi berjalan lancar.</p>
      <div class="emodul-tool-grid">
        <article><span>01</span><div><b>Perangkat Keras</b><small>Pengembangan dan pengujian</small></div><p>Komputer desktop atau laptop untuk pengembangan serta telepon pintar atau tablet untuk menguji pengalaman siswa.</p></article>
        <article><span>02</span><div><b>Visual Studio Code</b><small>Editor kode</small></div><p>Digunakan untuk mengelola proyek. ESLint, CSS IntelliSense, dan GitLens bersifat rekomendasi; proyek Vite tidak memerlukan Live Server.</p></article>
        <article><span>03</span><div><b>Git dan GitHub</b><small>Version control</small></div><p>Menyimpan riwayat perubahan, mendukung kolaborasi, dan menjadi sumber kode untuk proses deployment.</p></article>
        <article><span>04</span><div><b>Vercel</b><small>Hosting dan deployment</small></div><p>Akun Vercel yang terhubung ke GitHub digunakan untuk build, preview, dan publikasi frontend secara otomatis.</p></article>
        <article><span>05</span><div><b>Node.js dan npm</b><small>Runtime dan package manager</small></div><p>Vite 8 memerlukan Node.js <code>20.19+</code> atau <code>22.12+</code>. npm memasang dependensi dan menjalankan script proyek.</p></article>
        <article><span>06</span><div><b>Browser Modern</b><small>Pengujian aplikasi</small></div><p>Chrome, Edge, Safari, atau Firefox versi terkini yang mendukung ES Modules, Fetch API, audio, dan PWA Service Worker.</p></article>
        <article><span>07</span><div><b>Firebase</b><small>Layanan backend cloud</small></div><p>Proyek Firebase dengan Authentication, Cloud Firestore, dan Firebase Storage. Konfigurasinya disimpan melalui environment variables.</p></article>
      </div>
      <div class="emodul-note"><strong>Catatan kompatibilitas:</strong> jalankan <code>node --version</code> dan <code>npm --version</code>, kemudian cocokkan versi Node.js dengan persyaratan Vite pada proyek sebelum memasang dependensi.</div>`,
    task: 'Buat daftar kesiapan sistem dan catat versi Node.js, npm, Git, browser, serta status akun GitHub, Vercel, dan Firebase yang digunakan.',
    caption: 'Lingkungan kerja dan perangkat pendukung pengembangan.'
  },
  {
    id: 'analisis', number: '03', kicker: 'Analyze', title: 'Analisis Kebutuhan', duration: '10 menit', image: 3,
    objective: 'Membedakan kebutuhan fungsional, nonfungsional, dan hak akses pengguna.',
    body: `
      <h3>Kebutuhan fungsional</h3>
      <ul><li>Autentikasi dan pembagian hak akses berdasarkan peran.</li><li>Materi, mufrodat, muhadatsah, audio, kuis, dan progres.</li><li>Kelas, CMS, course, tugas, submission, rubrik, penilaian, dan remedial.</li><li>Rapor peserta didik, gradebook, serta dashboard guru.</li></ul>
      <h3>Kebutuhan nonfungsional</h3>
      <ul><li>Responsif pada desktop dan telepon pintar.</li><li>Menyediakan keadaan loading, kosong, berhasil, dan gagal.</li><li>Menjaga pembatasan akses melalui aturan keamanan Firestore.</li><li>Dapat dibangun sebagai produk dan digunakan sebagai PWA.</li></ul>`,
    task: 'Kelompokkan fitur aplikasi menjadi fitur belajar, evaluasi, dan administrasi.',
    caption: 'Pembagian fitur dan hak akses berdasarkan peran pengguna.'
  },
  {
    id: 'desain', number: '04', kicker: 'Design', title: 'Desain UI dengan Google Stitch', duration: '20 menit', image: 4,
    objective: 'Menyusun prompt desain dan menerapkan sistem visual yang konsisten.',
    body: `
      <p>Google Stitch digunakan untuk mengeksplorasi antarmuka melalui instruksi bahasa alami. Prompt yang baik menyebutkan <strong>pengguna, tujuan, daftar layar, komponen, gaya visual, dan perilaku responsif</strong>.</p>
      <h3>Langkah perancangan dengan Google Stitch</h3>
      <div class="emodul-procedure"><div><b>1</b><span><strong>Buat proyek</strong><small>Buka Google Stitch dan buat proyek desain baru untuk Lughati Arabic.</small></span></div><div><b>2</b><span><strong>Masukkan prompt utama</strong><small>Jelaskan konteks produk, pengguna, fitur, gaya visual, dan kebutuhan responsif.</small></span></div><div><b>3</b><span><strong>Periksa hasil awal</strong><small>Tinjau hierarki, navigasi, keterbacaan teks Arab, komponen, dan konsistensi visual.</small></span></div><div><b>4</b><span><strong>Gunakan prompt modular</strong><small>Perinci satu kelompok layar, misalnya fitur murid, dashboard guru, atau evaluasi.</small></span></div><div><b>5</b><span><strong>Lakukan iterasi</strong><small>Berikan instruksi revisi yang spesifik berdasarkan kekurangan hasil sebelumnya.</small></span></div><div><b>6</b><span><strong>Dokumentasikan desain</strong><small>Simpan hasil terbaik, prompt yang digunakan, dan alasan pemilihan desain.</small></span></div></div>
      <h3>Formula penyusunan prompt</h3>
      <p>Gunakan urutan: <strong>konteks produk → sasaran pengguna → tujuan layar → komponen wajib → gaya visual → perilaku responsif → keluaran yang diharapkan</strong>. Prompt utama menjaga konsistensi produk, sedangkan prompt modular digunakan untuk memperinci setiap kelompok antarmuka.</p>
      <div class="emodul-prompt-library">
        <details open class="emodul-prompt-card"><summary><span><b>Prompt Utama</b><small>Acuan keseluruhan produk</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Buat desain aplikasi web responsif bernama “Lughati Arabic” untuk pembelajaran Bahasa Arab tingkat SMA. Aplikasi memiliki dua peran, yaitu murid dan guru. Untuk murid, sediakan halaman login, beranda, daftar course, materi, mufrodat berbentuk flashcard, muhadatsah berbentuk percakapan, kuis interaktif, tugas, rapor, dan profil. Untuk guru, sediakan dashboard kelas, pengelolaan konten, penyusunan course dan modul, penilaian tugas, serta buku nilai. Gunakan gaya visual modern, ramah pelajar, ruang putih yang cukup, warna biru lembut, ikon konsisten, dan teks Arab yang jelas serta mudah dibaca. Gunakan sidebar pada desktop dan navigasi yang sesuai untuk layar mobile. Pastikan kontras, hierarki informasi, keadaan loading, kosong, berhasil, dan gagal dirancang secara konsisten.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Antarmuka Murid</b><small>Login, beranda, dan navigasi belajar</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Rancang antarmuka murid Lughati Arabic yang responsif. Buat halaman login sederhana dengan pilihan peran, input email atau identitas pengguna, kata sandi, validasi, dan pesan kesalahan. Pada beranda, tampilkan tindakan belajar berikutnya, progres latihan mandiri, streak, materi aktif, course, dan pintasan rapor. Gunakan hierarki visual yang membantu siswa memahami aktivitas prioritas. Sediakan sidebar pada desktop dan navigasi ringkas pada perangkat mobile.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Materi dan Mufrodat</b><small>Konten belajar, flashcard, dan audio</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Rancang halaman materi dan mufrodat Lughati Arabic. Halaman materi menampilkan capaian pembelajaran, daftar bab, teks Arab berharakat, transliterasi, arti, tabel, dan blok penjelasan yang mudah dipindai. Halaman mufrodat menggunakan flashcard interaktif dengan ilustrasi, teks Arab berukuran besar, transliterasi, arti, contoh kalimat, tombol audio, aksi balik kartu, indikator progres, navigasi sebelumnya dan berikutnya, serta tombol untuk menandai kata yang sudah dilatih. Pastikan teks Arab tidak terpotong pada layar kecil.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Muhadatsah dan Evaluasi</b><small>Dialog, kuis, dan umpan balik</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Rancang halaman muhadatsah sebagai percakapan dua arah dengan identitas pembicara, teks Arab, transliterasi atau terjemahan, tombol audio per ujaran, serta kontrol untuk menyembunyikan terjemahan. Rancang pusat evaluasi yang memuat Listening Challenge, Tebak Kosakata, Penyusunan Kata, dan Teka-Teki Silang. Setiap kuis memiliki instruksi, nomor soal, progress bar, skor, umpan balik benar atau salah, hasil akhir, perolehan XP, tombol coba lagi, dan ulasan jawaban yang menjelaskan koreksi.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Antarmuka Guru</b><small>Dashboard, CMS, dan penilaian</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Rancang dashboard guru Lughati Arabic untuk memantau aktivitas kelas. Tampilkan pemilih kelas dan modul, jumlah siswa, rata-rata progres, XP, streak, level, antrean tugas, kebutuhan remedial, catatan kelas, kode bergabung, pencarian murid, dan akses ke detail setiap peserta. Sediakan CMS untuk mengelola materi, mufrodat, muhadatsah, dan kuis berdasarkan jenjang. Sertakan formulir tambah dan edit, pengurutan konten, pratinjau, keadaan kosong, konfirmasi penghapusan, serta umpan balik penyimpanan.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Course, Tugas, dan Buku Nilai</b><small>Alur pengelolaan pembelajaran</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Rancang antarmuka guru untuk membuat course dan modul pembelajaran. Sediakan tujuan pembelajaran, urutan modul, aktivitas, prasyarat, tugas, batas waktu, lampiran, dan rubrik berbasis kriteria. Buat halaman pemeriksaan submission yang menampilkan karya siswa, riwayat revisi, skor per kriteria, umpan balik guru, status ketuntasan, dan arahan remedial. Tambahkan buku nilai yang dapat difilter berdasarkan kelas, modul, dan status serta tetap terbaca pada tablet.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
        <details class="emodul-prompt-card"><summary><span><b>Audit Responsif dan Aksesibilitas</b><small>Pemeriksaan akhir desain</small></span><span class="emodul-prompt-toggle">Buka</span></summary><div><pre><code>Evaluasi rancangan Lughati Arabic pada desktop, tablet, dan ponsel. Periksa kontras warna, ukuran target sentuh minimal 44 piksel, urutan fokus keyboard, label formulir, keadaan fokus, keterbacaan teks Arab berharakat, pemenggalan teks, scroll horizontal, dialog modal, serta navigasi pada layar kecil. Tampilkan rekomendasi perbaikan dalam tabel berisi masalah, dampak bagi pengguna, prioritas, dan solusi desain.</code></pre><button type="button" class="emodul-copy-prompt">${icon('clipboard', { size: 16 })} Salin Prompt</button></div></details>
      </div>
      <h3>Sistem desain</h3>
      <div class="emodul-swatches"><span style="--swatch:#182B49">Navy</span><span style="--swatch:#2966A3">Blue</span><span style="--swatch:#168B5B">Success</span><span style="--swatch:#F59E0B">Warning</span></div>
      <p>Teks Latin menggunakan keluarga sans-serif yang jelas, sementara teks Arab menggunakan font yang mendukung harakat. Hierarki spasi memakai kelipatan 4 px dan komponen mempertahankan radius serta ikon yang konsisten.</p>`,
    task: 'Pilih satu prompt modular, sesuaikan dengan kebutuhan proyek, lalu dokumentasikan perubahan prompt dan hasil desain yang dihasilkan.',
    caption: 'Dokumentasi sistem desain dan konsistensi visual produk.'
  },
  {
    id: 'pengembangan', number: '05', kicker: 'Development', title: 'Dari Desain Menjadi Aplikasi', duration: '25 menit', image: 8,
    objective: 'Menjelaskan teknologi dan alur implementasi desain menjadi aplikasi web.',
    body: `
      <div class="emodul-tech-grid"><span>HTML5<br><small>Struktur</small></span><span>CSS3<br><small>Visual</small></span><span>JavaScript<br><small>Interaksi</small></span><span>Vite<br><small>Build tool</small></span><span>Firebase<br><small>Data</small></span><span>PWA<br><small>Distribusi</small></span></div>
      <h3>Langkah implementasi desain</h3>
      <div class="emodul-procedure"><div><b>1</b><span><strong>Buka workspace</strong><small>Buka folder proyek melalui Visual Studio Code dan periksa struktur berkas.</small></span></div><div><b>2</b><span><strong>Pasang dependensi</strong><small>Jalankan <code>npm install</code> dari root proyek.</small></span></div><div><b>3</b><span><strong>Siapkan konfigurasi</strong><small>Buat berkas environment lokal dan isi variabel Firebase yang diperlukan.</small></span></div><div><b>4</b><span><strong>Jalankan development server</strong><small>Gunakan <code>npm run dev</code>, lalu buka alamat localhost yang ditampilkan.</small></span></div><div><b>5</b><span><strong>Bangun struktur antarmuka</strong><small>Terjemahkan rancangan menjadi view, komponen, routing, dan stylesheet yang modular.</small></span></div><div><b>6</b><span><strong>Hubungkan data</strong><small>Integrasikan autentikasi, Firestore, Storage, serta keadaan loading dan error.</small></span></div><div><b>7</b><span><strong>Uji setiap fitur</strong><small>Periksa alur murid dan guru setelah setiap perubahan penting.</small></span></div><div><b>8</b><span><strong>Validasi produksi</strong><small>Jalankan <code>npm test</code> dan <code>npm run build</code> sebelum commit.</small></span></div></div>
      <div class="emodul-note"><strong>Keamanan:</strong> kredensial dan data pribadi tidak boleh dimasukkan ke repositori atau dokumentasi publik.</div>`,
    task: 'Jelaskan perbedaan fungsi development server dan build produksi.',
    caption: 'Workspace dan struktur direktori proyek Lughati Arabic.'
  },
  {
    id: 'murid', number: '06', kicker: 'Implementation', title: 'Implementasi Antarmuka dan Fitur Murid', duration: '30 menit', image: 12,
    objective: 'Menganalisis implementasi alur, antarmuka, dan fitur belajar murid dari beranda hingga evaluasi.',
    body: `
      <div class="emodul-steps"><div><b>1</b><span><strong>Masuk</strong><small>Gunakan identitas peserta didik.</small></span></div><div><b>2</b><span><strong>Belajar</strong><small>Buka materi, mufrodat, dan muhadatsah.</small></span></div><div><b>3</b><span><strong>Berlatih</strong><small>Dengarkan audio dan kerjakan kuis.</small></span></div><div><b>4</b><span><strong>Refleksi</strong><small>Tinjau tugas, skor, progres, dan rapor.</small></span></div></div>
      <h3>Walkthrough alur murid</h3><div class="emodul-procedure"><div><b>1</b><span><strong>Masuk sebagai murid</strong><small>Gunakan akun siswa dan pastikan menu yang tampil sesuai peran.</small></span></div><div><b>2</b><span><strong>Periksa beranda</strong><small>Lihat tindakan berikutnya, progres, streak, course, dan pintasan rapor.</small></span></div><div><b>3</b><span><strong>Baca materi</strong><small>Pilih bab, baca tujuan, lalu pelajari teks, tabel, dan contoh yang tersedia.</small></span></div><div><b>4</b><span><strong>Latih mufrodat</strong><small>Dengarkan audio, balik flashcard, dan tandai kata yang sudah dilatih.</small></span></div><div><b>5</b><span><strong>Praktik muhadatsah</strong><small>Baca dialog per pembicara, putar audio, lalu sembunyikan terjemahan.</small></span></div><div><b>6</b><span><strong>Kerjakan kuis</strong><small>Pilih tipe latihan, selesaikan soal, dan perhatikan progress bar serta skor.</small></span></div><div><b>7</b><span><strong>Tinjau hasil</strong><small>Pelajari koreksi jawaban, XP, catatan guru, progres, dan rapor.</small></span></div></div>
      <h3>Beranda dan materi</h3><p>Beranda menunjukkan tindakan berikutnya, progres latihan mandiri, streak, dan pintasan belajar. Pada bagian Materi, siswa memilih bab sesuai kelas, membaca tujuan pembelajaran, serta mempelajari penjelasan dan tabel berisi teks Arab, transliterasi, dan arti.</p>
      <h3>Mufrodat dan muhadatsah</h3><p>Kartu mufrodat menghubungkan tulisan Arab, transliterasi, arti, ilustrasi, contoh kalimat, serta audio. Siswa dapat membalik kartu, menandai kata yang sudah dilatih, dan berpindah ke latihan. Muhadatsah menyajikan ujaran sesuai pembicara, terjemahan yang dapat disembunyikan, dan audio pada setiap giliran agar percakapan dapat dipelajari serta dipraktikkan secara berpasangan.</p>
      <h3>Evaluasi dan umpan balik</h3><p>Knowledge Checks menyediakan Listening Challenge, Tebak Kosakata, Penyusunan Kata, dan Teka-Teki Silang. Progress bar serta skor membantu siswa memantau pengerjaan. Setelah kuis selesai, aplikasi menampilkan nilai, waktu, XP, dan ulasan jawaban benar maupun salah beserta penjelasan korektif.</p>`,
    task: 'Coba satu fitur belajar dan catat bagian yang membantu serta satu usulan perbaikan.',
    caption: 'Beranda pembelajaran peserta didik.'
  },
  {
    id: 'guru', number: '07', kicker: 'Implementation', title: 'Implementasi Antarmuka dan Fitur Guru', duration: '30 menit', image: 17,
    objective: 'Menganalisis implementasi pengelolaan kelas, konten, course, tugas, dan penilaian dari sisi guru.',
    body: `
      <p>Dashboard guru menyajikan ringkasan kelas, progres, ketuntasan, kebutuhan remedial, serta tugas yang menunggu pemeriksaan.</p>
      <h3>Walkthrough alur guru</h3><div class="emodul-procedure"><div><b>1</b><span><strong>Masuk sebagai guru</strong><small>Gunakan akun guru yang telah diverifikasi dan periksa akses menu pengelolaan.</small></span></div><div><b>2</b><span><strong>Siapkan kelas</strong><small>Buat atau pilih kelas, salin kode bergabung, dan periksa daftar peserta.</small></span></div><div><b>3</b><span><strong>Kelola konten</strong><small>Pilih jenjang dan jenis konten, lalu tambah atau perbarui materi pembelajaran.</small></span></div><div><b>4</b><span><strong>Susun course</strong><small>Tentukan tujuan, urutan modul, aktivitas, prasyarat, tugas, dan rubrik.</small></span></div><div><b>5</b><span><strong>Pratinjau sebagai murid</strong><small>Periksa teks Arab, audio, navigasi, kuis, dan layout sebelum diterbitkan.</small></span></div><div><b>6</b><span><strong>Pantau dan nilai</strong><small>Tinjau progres serta submission, beri skor dan umpan balik, lalu tetapkan remedial bila diperlukan.</small></span></div></div>
      <h3>Pemantauan kelas dan peserta didik</h3><p>Guru memilih kelas dan modul untuk melihat rata-rata latihan, XP, streak, level, serta aktivitas setiap murid. Detail murid memuat catatan khusus dan riwayat pengerjaan kuis sehingga guru dapat memberi umpan balik yang lebih personal dan menentukan tindak lanjut belajar.</p>
      <h3>Alur CMS</h3><ol><li>Pilih jenis konten: materi, mufrodat, muhadatsah, atau kuis.</li><li>Tambahkan atau perbarui isi dan media.</li><li>Gunakan pratinjau untuk memeriksa teks Arab serta layout.</li><li>Simpan dan verifikasi dari tampilan peserta didik.</li></ol>
      <h3>Pengelolaan materi dan evaluasi</h3><p>Konten dikelompokkan menurut kelas dan jenisnya. Pada mufrodat, guru mengisi teks Arab, transliterasi, arti, contoh kalimat, dan ilustrasi. Pada muhadatsah, guru mengatur identitas topik serta urutan dialog. Materi disusun dari blok teks atau tabel, sedangkan bank kuis dapat dipilah menurut tipe latihan dan diurutkan kembali.</p>
      <h3>Course dan penilaian</h3><p>Guru menyusun tujuan, modul, aktivitas, prasyarat, tugas, dan rubrik. Hasil submission diperiksa untuk menghasilkan skor, umpan balik, status ketuntasan, atau arahan remedial. Halaman profil merangkum jumlah kelas yang diampu dan peserta didik sebagai pintasan menuju aktivitas utama guru.</p>`,
    task: 'Rancang tugas dengan tiga kriteria rubrik dan tentukan batas ketuntasannya.',
    caption: 'Dashboard analitik dan buku nilai pengajar.'
  },
  {
    id: 'evaluasi', number: '08', kicker: 'Evaluation', title: 'Pengujian dan Publikasi', duration: '20 menit', image: 10,
    objective: 'Melakukan pemeriksaan dasar sebelum dan sesudah deployment.',
    body: `
      <h3>Prosedur pengujian</h3><div class="emodul-procedure"><div><b>1</b><span><strong>Siapkan skenario</strong><small>Tentukan fitur, data uji, akun murid, akun guru, dan hasil yang diharapkan.</small></span></div><div><b>2</b><span><strong>Jalankan aplikasi</strong><small>Gunakan environment pengujian dan pastikan console terbuka untuk melihat error.</small></span></div><div><b>3</b><span><strong>Uji peran dan navigasi</strong><small>Periksa login, pembatasan menu, perpindahan halaman, dan refresh route.</small></span></div><div><b>4</b><span><strong>Uji fitur belajar</strong><small>Periksa materi, audio, mufrodat, muhadatsah, kuis, skor, dan ulasan.</small></span></div><div><b>5</b><span><strong>Uji pengelolaan</strong><small>Periksa kelas, CMS, tugas, submission, penilaian, dan remedial.</small></span></div><div><b>6</b><span><strong>Uji responsif</strong><small>Periksa desktop dan ponsel, termasuk navigasi, dialog, teks Arab, dan target sentuh.</small></span></div><div><b>7</b><span><strong>Catat dan uji ulang</strong><small>Dokumentasikan hasil aktual, perbaiki kegagalan, lalu jalankan pengujian ulang.</small></span></div></div>
      <h3>Checklist pengujian</h3><p>Gunakan daftar ini saat mencoba aplikasi. Centang setiap butir hanya jika fungsi yang diuji berjalan sesuai hasil yang diharapkan.</p><ul class="emodul-checklist"><li><label><input type="checkbox"><span><b>Login murid dan guru</b><small>Kedua akun dapat masuk dan membuka menu sesuai perannya.</small></span></label></li><li><label><input type="checkbox"><span><b>Navigasi dan refresh route</b><small>Menu dapat dibuka dan halaman tetap tampil setelah dimuat ulang.</small></span></label></li><li><label><input type="checkbox"><span><b>Audio pelafalan Arab</b><small>Tombol audio memutar suara yang sesuai dengan teks.</small></span></label></li><li><label><input type="checkbox"><span><b>Kuis, skor, dan ulasan</b><small>Jawaban dapat dikirim, skor dihitung, dan koreksi ditampilkan.</small></span></label></li><li><label><input type="checkbox"><span><b>Tugas dan penilaian</b><small>Tugas dapat dikumpulkan dan hasil penilaian dapat dilihat.</small></span></label></li><li><label><input type="checkbox"><span><b>Layout desktop dan mobile</b><small>Konten tetap terbaca dan navigasi dapat digunakan di kedua ukuran layar.</small></span></label></li></ul>
      <h3>Deployment</h3><p>Build produksi menggunakan <code>npm run build</code> dan menghasilkan folder <code>dist</code>. Setelah publikasi, lakukan smoke test terhadap HTTPS, autentikasi, route SPA, audio, data, dan responsivitas.</p>`,
    task: 'Lakukan smoke test dan tulis hasil aktual untuk setiap item pada checklist.',
    caption: 'Pengujian otomatis dan proses build produksi.'
  },
  {
    id: 'deployment', number: '09', kicker: 'Deployment', title: 'GitHub dan Vercel', duration: '30 menit', image: 9,
    objective: 'Mempraktikkan pengunggahan kode ke GitHub, konfigurasi Vercel, deployment, dan verifikasi aplikasi produksi.',
    body: `
      <p>Ikuti langkah berikut secara berurutan. Jalur ini menggunakan integrasi GitHub agar setiap perubahan pada branch produksi dapat membangun dan memperbarui aplikasi secara otomatis.</p>
      <div class="emodul-deploy-steps">
        <section><b>1</b><div><h3>Periksa proyek secara lokal</h3><p>Buka terminal pada folder proyek, pasang dependensi, jalankan pengujian, lalu buat build produksi.</p><pre><code>npm install
npm test
npm run build</code></pre><p>Proses dapat dilanjutkan jika pengujian dan build selesai tanpa error. Vite menghasilkan berkas produksi di folder <code>dist</code>.</p></div></section>
        <section><b>2</b><div><h3>Amankan berkas yang tidak boleh diunggah</h3><p>Pastikan <code>.gitignore</code> memuat <code>node_modules</code>, <code>dist</code>, <code>.env</code>, dan berkas lokal lain. Jalankan <code>git status</code> dan pastikan nilai environment variable tidak ikut terdaftar sebagai berkas yang akan di-commit.</p><div class="emodul-note"><strong>Penting:</strong> jangan menempelkan nilai API key, token, atau kredensial administratif ke dokumentasi maupun perintah Git.</div></div></section>
        <section><b>3</b><div><h3>Buat repositori dan commit awal</h3><p>Jika folder belum menjadi repositori Git, jalankan rangkaian berikut. Jika sudah, cukup periksa status lalu commit perubahan yang diperlukan.</p><pre><code>git init
git add .
git commit -m "Initial commit Lughati Arabic"
git branch -M main</code></pre><p>Sebelum commit, tinjau kembali daftar berkas dengan <code>git status</code>.</p></div></section>
        <section><b>4</b><div><h3>Hubungkan dan kirim ke GitHub</h3><p>Buat repositori kosong di GitHub tanpa menambahkan README baru, lalu salin URL repositorinya. Ganti URL contoh berikut dengan URL milikmu.</p><pre><code>git remote add origin https://github.com/USERNAME/NAMA-REPOSITORI.git
git push -u origin main</code></pre><p>Buka halaman repositori dan pastikan kode sumber sudah tampil, sedangkan <code>.env</code>, <code>node_modules</code>, dan <code>dist</code> tidak ikut terunggah.</p></div></section>
        <section><b>5</b><div><h3>Impor repositori ke Vercel</h3><ol><li>Masuk ke Vercel menggunakan akun yang terhubung dengan GitHub.</li><li>Pilih <strong>Add New → Project</strong>, kemudian pilih repositori Lughati Arabic.</li><li>Pastikan framework terdeteksi sebagai <strong>Vite</strong>.</li><li>Gunakan build command <code>npm run build</code> dan output directory <code>dist</code>.</li><li>Biarkan root directory berada di root proyek karena <code>package.json</code> tersedia di sana.</li></ol></div></section>
        <section><b>6</b><div><h3>Masukkan environment variables</h3><p>Pada pengaturan proyek Vercel, tambahkan variabel yang digunakan aplikasi: <code>VITE_FIREBASE_API_KEY</code>, <code>VITE_FIREBASE_AUTH_DOMAIN</code>, <code>VITE_FIREBASE_PROJECT_ID</code>, <code>VITE_FIREBASE_STORAGE_BUCKET</code>, <code>VITE_FIREBASE_MESSAGING_SENDER_ID</code>, <code>VITE_FIREBASE_APP_ID</code>, dan <code>VITE_IMGBB_API_KEY</code>.</p><p>Pilih environment yang sesuai—Production, Preview, dan Development jika diperlukan. Perubahan environment variable hanya berlaku pada deployment baru, sehingga lakukan redeploy setelah memperbaruinya.</p></div></section>
        <section><b>7</b><div><h3>Pastikan routing SPA tersedia</h3><p>Proyek menggunakan <code>vercel.json</code> untuk mengarahkan seluruh route ke <code>/index.html</code>. Konfigurasi ini mencegah error 404 ketika pengguna me-refresh alamat seperti <code>/materi</code> atau <code>/modul-pengembangan</code>.</p><pre><code>{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}</code></pre></div></section>
        <section><b>8</b><div><h3>Deploy dan periksa log</h3><p>Tekan <strong>Deploy</strong> dan tunggu hingga statusnya Ready. Jika proses gagal, buka Build Logs, cari pesan error pertama, perbaiki proyek secara lokal, kemudian push commit baru. Vercel akan membuat deployment baru secara otomatis.</p></div></section>
        <section><b>9</b><div><h3>Daftarkan domain pada Firebase Authentication</h3><p>Jika login Firebase ditolak pada domain produksi, buka Firebase Console → Authentication → Settings → Authorized domains, lalu tambahkan domain Vercel aplikasi tanpa protokol dan tanpa path.</p></div></section>
        <section><b>10</b><div><h3>Lakukan smoke test produksi</h3><ul><li>Buka domain produksi melalui HTTPS.</li><li>Uji login siswa dan guru serta pembatasan perannya.</li><li>Buka beberapa route lalu refresh untuk memastikan tidak terjadi 404.</li><li>Uji pembacaan data Firestore, gambar, audio, kuis, skor, dan ulasan.</li><li>Periksa tampilan desktop dan ponsel.</li><li>Buka Console browser dan Vercel Runtime Logs untuk memastikan tidak ada error penting.</li></ul></div></section>
        <section><b>11</b><div><h3>Publikasikan pembaruan berikutnya</h3><p>Setelah perubahan lolos pengujian lokal, commit dan push kembali ke branch <code>main</code>. Integrasi GitHub akan memicu deployment produksi baru.</p><pre><code>git add .
git commit -m "Jelaskan perubahan"
git push</code></pre></div></section>
      </div>
      <h3>Indikator keberhasilan</h3><p>Deployment dinyatakan berhasil apabila status Vercel Ready, domain menggunakan HTTPS, autentikasi dan data berjalan, seluruh route dapat di-refresh, serta tidak ditemukan error kritis pada tampilan desktop maupun mobile.</p>`,
    task: 'Lakukan deployment atau audit deployment yang tersedia. Dokumentasikan URL, commit yang digunakan, status build, environment yang diuji, dan hasil setiap butir smoke test.',
    caption: 'Konfigurasi pengembangan dan persiapan deployment aplikasi.'
  },
  {
    id: 'fitur', number: '10', kicker: 'Product', title: 'Ringkasan Fitur Media', duration: '8 menit', image: 16,
    objective: 'Mengidentifikasi hubungan setiap fitur dengan fungsi pembelajaran dan pengelolaan kelas.',
    body: `
      <div class="emodul-feature-table">
        <div><b>Portal Masuk & Autentikasi</b><p>Pemisahan gerbang masuk siswa dan guru dengan verifikasi peran pada Firestore.</p></div><div><b>Beranda & Dasbor Belajar</b><p>Statistik pencapaian, streak latihan, modul aktif, dan pintasan materi.</p></div><div><b>Materi Tematik</b><p>Teks Arab berharakat, transliterasi, terjemahan, dan catatan gramatika.</p></div><div><b>Mufrodat Interaktif</b><p>Flashcard, audio pelafalan, arti, dan contoh kalimat.</p></div><div><b>Muhadatsah Dialog</b><p>Percakapan dua arah dengan audio per ujaran.</p></div><div><b>Kuis Formatif</b><p>Progress bar, umpan balik, akurasi, dan ulasan jawaban.</p></div><div><b>Tugas & Rubrik</b><p>Pengumpulan, penilaian berbasis kriteria, revisi, dan remedial.</p></div><div><b>CMS & Buku Nilai</b><p>Pengelolaan bahan ajar dan rekapitulasi hasil belajar.</p></div>
      </div>`,
    task: 'Pilih satu fitur dan jelaskan tujuan pedagogis, input, proses, serta keluarannya.',
    caption: 'Dokumentasi tugas dan capaian belajar dalam aplikasi.'
  },
  {
    id: 'keamanan', number: '11', kicker: 'Security', title: 'Validasi Keamanan Firestore', duration: '15 menit', image: 18,
    objective: 'Menjelaskan tujuan pengujian aturan keamanan dan pembatasan akses data.',
    body: `<p>Keamanan transaksi diuji secara lokal menggunakan <strong>Firebase Emulator Suite</strong>. Berdasarkan laporan, sebanyak <strong>29 skenario pengujian</strong> memvalidasi aturan akses.</p><h3>Langkah validasi aturan keamanan</h3><div class="emodul-procedure"><div><b>1</b><span><strong>Siapkan emulator</strong><small>Pastikan Firebase CLI, konfigurasi emulator, rules, dan proyek demo tersedia.</small></span></div><div><b>2</b><span><strong>Tentukan skenario</strong><small>Buat kasus pengguna tanpa login, siswa, guru, kepemilikan data, dan akses lintas kelas.</small></span></div><div><b>3</b><span><strong>Siapkan data uji</strong><small>Masukkan dokumen minimum untuk pengguna, kelas, konten, tugas, dan submission.</small></span></div><div><b>4</b><span><strong>Jalankan pengujian</strong><small>Gunakan <code>npm run test:rules</code> agar transaksi dijalankan pada Firestore Emulator.</small></span></div><div><b>5</b><span><strong>Baca kegagalan</strong><small>Bandingkan operasi yang diizinkan atau ditolak dengan hasil yang diharapkan.</small></span></div><div><b>6</b><span><strong>Perbaiki dan ulangi</strong><small>Perbarui rules atau test, kemudian jalankan seluruh skenario sampai lulus.</small></span></div></div><h3>Aspek yang diverifikasi</h3><ul><li>Siswa tidak dapat memanipulasi perannya sendiri.</li><li>Akses data antar-kelas terisolasi.</li><li>Dokumen tugas tidak dapat diubah secara tidak sah setelah terkirim.</li><li>Aksi guru dibatasi oleh peran dan kelas yang dikelola.</li></ul><div class="emodul-note"><strong>Prinsip utama:</strong> menyembunyikan tombol tidak cukup; pembatasan harus diterapkan pada aturan keamanan basis data.</div>`,
    task: 'Jelaskan mengapa validasi hak akses harus dilakukan pada backend, bukan hanya pada tampilan.',
    caption: 'Antarmuka pengelolaan dan validasi data aplikasi.'
  },
  {
    id: 'troubleshooting', number: '12', kicker: 'Maintenance', title: 'Kendala dan Pemecahan Masalah', duration: '20 menit', image: 19,
    objective: 'Mendiagnosis kendala umum berdasarkan gejala, penyebab, dan tindakan perbaikan.',
    body: `<h3>Alur diagnosis masalah</h3><div class="emodul-procedure"><div><b>1</b><span><strong>Catat gejala</strong><small>Tulis halaman, akun, perangkat, waktu, dan tindakan saat masalah muncul.</small></span></div><div><b>2</b><span><strong>Reproduksi masalah</strong><small>Ulangi langkah yang sama untuk memastikan masalah dapat diamati kembali.</small></span></div><div><b>3</b><span><strong>Periksa bukti</strong><small>Baca Console browser, Network, build log, Firebase Emulator, atau Vercel Logs.</small></span></div><div><b>4</b><span><strong>Isolasi penyebab</strong><small>Bedakan masalah konfigurasi, data, izin, cache, browser, jaringan, atau kode.</small></span></div><div><b>5</b><span><strong>Terapkan perbaikan</strong><small>Ubah satu penyebab yang paling mungkin agar dampak perbaikannya dapat dinilai.</small></span></div><div><b>6</b><span><strong>Uji ulang</strong><small>Jalankan kembali langkah reproduksi dan periksa fitur lain yang berkaitan.</small></span></div><div><b>7</b><span><strong>Dokumentasikan</strong><small>Simpan gejala, akar masalah, tindakan, dan hasil akhir untuk referensi berikutnya.</small></span></div></div><h3>Contoh kendala</h3><div class="emodul-trouble-list"><details open><summary>Galat 404 saat refresh URL</summary><p><b>Penyebab:</b> belum ada rewrite SPA.<br><b>Solusi:</b> arahkan seluruh route menuju <code>/index.html</code>.</p></details><details><summary>Deployment gagal saat kompilasi</summary><p><b>Penyebab:</b> versi Node.js atau sintaks.<br><b>Solusi:</b> periksa build log, gunakan Node.js LTS, dan jalankan <code>npm run build</code>.</p></details><details><summary>Audio Arab tidak keluar</summary><p><b>Penyebab:</b> autoplay diblokir atau volume tidak aktif.<br><b>Solusi:</b> gunakan tombol audio dan periksa izin peramban.</p></details><details><summary>Teks Arab terpotong</summary><p><b>Penyebab:</b> font tidak mendukung harakat.<br><b>Solusi:</b> gunakan Amiri/Traditional Arabic dan line-height minimal 1,5.</p></details><details><summary>Perubahan CMS belum tampil</summary><p><b>Penyebab:</b> cache PWA masih menyajikan data lama.<br><b>Solusi:</b> muat ulang atau bersihkan cache.</p></details><details><summary>Dashboard Permission Denied</summary><p><b>Penyebab:</b> akun guru belum diverifikasi.<br><b>Solusi:</b> administrator memperbarui status akun pada Firestore.</p></details></div>`,
    task: 'Pilih satu gejala, lalu dokumentasikan langkah reproduksi dan hasil setelah perbaikan.',
    caption: 'Tampilan pengelolaan course sebagai bagian dari pemeliharaan sistem.'
  },
  {
    id: 'penutup', number: '13', kicker: 'Closure', title: 'Penutup dan Refleksi', duration: '6 menit', image: 2,
    objective: 'Merangkum hasil pengembangan dan merumuskan tindak lanjut implementasi.',
    body: `<p>Media pembelajaran interaktif <strong>Lughati Arabic</strong> dikembangkan melalui integrasi Google Stitch, Visual Studio Code, GitHub, Vercel, dan Cloud Firestore.</p><p>Produk menghadirkan pengalaman belajar bahasa Arab yang terpadu bagi peserta didik serta alat pedagogis terstruktur bagi guru untuk mengelola kelas, materi, aktivitas, penilaian, dan tindak lanjut.</p><p>Dengan mengikuti prosedur dalam laporan, implementasi media di sekolah menengah diharapkan berlangsung efektif, mandiri, dan berkelanjutan untuk meningkatkan kemahiran berbahasa Arab.</p>`,
    task: 'Tuliskan tiga kekuatan produk, dua keterbatasan, dan satu prioritas pengembangan berikutnya.',
    caption: 'Lughati Arabic sebagai media pembelajaran bahasa Arab berbasis web.'
  }
];

const legacyDocumentation = [
  { chapter: 'pengenalan', image: 2, title: 'Portal Lughati Arabic', description: 'Tampilan awal memperlihatkan identitas produk serta gerbang autentikasi. Pemisahan peran murid dan guru memastikan setiap pengguna memperoleh menu sesuai tugasnya.' },
  { chapter: 'analisis', image: 3, title: 'Pembagian hak akses pengguna', description: 'Visual ini mendokumentasikan kebutuhan dua aktor utama. Murid berfokus pada aktivitas belajar, sedangkan guru memperoleh fasilitas pengelolaan dan pemantauan.' },
  { chapter: 'desain', image: 4, title: 'Dokumentasi sistem desain', description: 'Rancangan visual menjadi acuan warna, tipografi, bentuk kartu, tombol, ikon, dan pola navigasi agar seluruh halaman konsisten.' },
  { chapter: 'persiapan', image: 5, title: 'Workspace dan struktur proyek', description: 'Explorer Visual Studio Code menunjukkan lingkungan kerja beserta pemisahan aset, data, modul tampilan, stylesheet, script, dan konfigurasi yang perlu dikenali sebelum pengembangan.' },
  { chapter: 'persiapan', image: 6, title: 'Development server Vite', description: 'Terminal memastikan Node.js, npm, dependensi, dan Vite dapat berjalan. Perintah npm run dev mengaktifkan server lokal serta Hot Module Replacement melalui alamat localhost.' },
  { chapter: 'evaluasi', image: 7, title: 'Pengujian otomatis dan build', description: 'Terminal memperlihatkan rangkaian pengujian berhasil serta proses build produksi. Tahap ini memastikan logika utama tetap bekerja sebelum aplikasi dipublikasikan.' },
  { chapter: 'deployment', image: 8, title: 'Repositori GitHub', description: 'Repositori menyimpan riwayat kode, konfigurasi, script, dan dokumentasi proyek. Branch utama menjadi sumber deployment produksi.' },
  { chapter: 'deployment', image: 9, title: 'Impor proyek ke Vercel', description: 'Proyek diimpor dari GitHub dengan preset Vite. Pada tahap ini ditetapkan root directory, build settings, dan environment variables.' },
  { chapter: 'deployment', image: 10, title: 'Deployment produksi siap', description: 'Dashboard Vercel menunjukkan status Ready, domain produksi, sumber commit, dan akses ke log serta pengaturan deployment.' },
  { chapter: 'murid', image: 11, title: 'Beranda belajar peserta didik', description: 'Beranda memusatkan tindakan berikutnya, akses materi, progres latihan, streak, dan rapor sehingga siswa mengetahui aktivitas yang perlu dilakukan.' },
  { chapter: 'murid', image: 12, title: 'Flashcard mufrodat', description: 'Kartu kosakata menyajikan teks Arab, transliterasi, arti, audio, pembalikan kartu, navigasi, dan penanda latihan mandiri.' },
  { chapter: 'murid', image: 13, title: 'Dialog muhadatsah', description: 'Percakapan ditampilkan sebagai balon dialog berdasarkan pembicara. Setiap ujaran memuat teks Arab, terjemahan, dan tombol audio untuk latihan pelafalan.' },
  { chapter: 'murid', image: 15, title: 'Rapor dan catatan belajar', description: 'Rapor memisahkan skor latihan dan penilaian guru, menampilkan catatan kelas, catatan individual, serta riwayat pengerjaan kuis.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (1).png', title: 'Beranda dan ringkasan progres siswa', description: 'Beranda menjadi pusat orientasi belajar dengan informasi tindakan berikutnya, tombol menuju materi dan course, progres latihan mandiri, streak belajar, serta pintasan rapor. Ringkasan ini membantu siswa menentukan aktivitas yang perlu dikerjakan.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (2).png', title: 'Daftar materi sesuai kelas', description: 'Halaman Materi menampilkan kumpulan bab untuk jenjang siswa beserta jumlah bagian pada setiap bab. Tombol CP/TP membantu siswa memahami capaian dan tujuan pembelajaran sebelum membuka isi materi.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (3).png', title: 'Isi materi Isim Dhamir', description: 'Materi disajikan melalui penjelasan terstruktur dan tabel yang menghubungkan bentuk Arab, transliterasi, serta arti. Penyajian ini membantu siswa memahami konsep kata ganti sekaligus membandingkan setiap bentuk secara langsung.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (4).png', title: 'Pilihan modul mufrodat', description: 'Modul Mufrodat mengelompokkan kosakata berdasarkan bab dan topik. Setiap kartu menampilkan judul Arab, transliterasi, deskripsi, jumlah kata yang sudah dilatih, dan tombol untuk memulai pembelajaran.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (5).png', title: 'Flashcard mufrodat dan audio', description: 'Flashcard mempertemukan teks Arab, transliterasi, arti, ilustrasi, serta audio pelafalan. Siswa dapat membalik kartu, menandai kata sebagai sudah dilatih, melihat progres, berpindah antarkartu, lalu melanjutkan ke latihan.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (6).png', title: 'Pilihan topik muhadatsah', description: 'Halaman Muhadatsah menyediakan berbagai percakapan berdasarkan tema dan tingkat kesulitan. Kartu menunjukkan judul Arab, deskripsi, jumlah ujaran, serta tombol mulai agar siswa dapat memilih latihan yang sesuai.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (7).png', title: 'Latihan dialog muhadatsah', description: 'Percakapan ditampilkan bergantian menurut pembicara dengan teks Arab berharakat, transliterasi atau terjemahan, serta audio pada setiap ujaran. Siswa juga dapat menyembunyikan terjemahan untuk meningkatkan tantangan membaca dan menyimak.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (8).png', title: 'Pilihan Knowledge Checks', description: 'Pusat kuis menyediakan empat bentuk evaluasi: Listening Challenge, Tebak Kosakata, Penyusunan Kata, dan Teka-Teki Silang. Status kesiapan, jumlah bab, dan deskripsi singkat membantu siswa memilih latihan yang akan dikerjakan.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (9).png', title: 'Kuis Listening Challenge', description: 'Pada latihan menyimak, siswa memutar audio kosakata atau kalimat Arab lalu memilih makna yang paling sesuai. Indikator nomor soal, progress bar, dan skor memberikan informasi pengerjaan secara langsung.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (10).png', title: 'Kuis tebak kosakata', description: 'Kuis menampilkan kosakata Arab dan meminta siswa memilih artinya dalam bahasa Indonesia. Bentuk pilihan ganda ini mengukur kemampuan mengenali makna kosakata dengan cepat.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (11).png', title: 'Kuis penyusunan kata', description: 'Siswa menyusun potongan kata Arab menjadi kalimat yang benar berdasarkan petunjuk arti. Area susun, daftar kata, tombol pemeriksaan, progress bar, dan skor mendukung latihan struktur kalimat secara interaktif.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (12).png', title: 'Teka-teki silang kosakata Arab', description: 'Teka-teki silang menguji penguasaan kosakata melalui petunjuk mendatar dan menurun. Nomor pada petunjuk terhubung dengan petak jawaban sehingga siswa berlatih mengingat serta menuliskan kosakata dalam konteks permainan.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (13).png', title: 'Hasil dan penghargaan kuis', description: 'Setelah latihan selesai, siswa menerima skor, durasi pengerjaan, perolehan XP, dan pesan capaian. Tombol pengulangan dan pemilihan bab lain mendorong latihan lanjutan, sedangkan ulasan jawaban mendukung refleksi.' },
  { chapter: 'murid', src: '/siswa/Macbook-Air-lughati-arabic.vercel.app (14).png', title: 'Ulasan jawaban dan koreksi', description: 'Ulasan membedakan jawaban benar dan salah melalui warna serta simbol. Untuk jawaban yang keliru, sistem menampilkan jawaban yang benar dan contoh penggunaan sehingga siswa memperoleh umpan balik korektif yang dapat langsung dipelajari.' },
  { chapter: 'guru', image: 16, title: 'Login khusus guru', description: 'Guru memilih peran pada portal masuk dan menggunakan email serta kata sandi. Sistem kemudian memvalidasi akun sebelum membuka area pengelolaan.' },
  { chapter: 'guru', image: 17, title: 'Dashboard kelas', description: 'Dashboard menyediakan pemilih kelas, antrean tindakan, catatan kelas, kode bergabung, pencarian murid, serta ringkasan progres setiap peserta.' },
  { chapter: 'guru', image: 18, title: 'Content Management System', description: 'CMS mengelompokkan Mufrodat, Muhadatsah, Materi, dan Kuis berdasarkan tingkat. Guru dapat menambah kategori serta mengurutkan dan mengelola konten.' },
  { chapter: 'guru', image: 14, title: 'Pratinjau kuis interaktif', description: 'Guru dapat memeriksa soal penyusunan kalimat, urutan kata, progress bar, skor, dan tombol pemeriksaan sebelum kuis digunakan oleh siswa.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (2).png', title: 'Dashboard kelas dan progres murid', description: 'Dashboard membantu guru memilih kelas dan modul, membuat kelas baru, membagikan kode bergabung, menulis catatan kelas, serta melihat ringkasan capaian murid. Tabel menampilkan kata yang dipelajari, rata-rata latihan, XP, streak, dan level sebagai dasar pemantauan.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (1).png', title: 'Detail catatan dan riwayat kuis murid', description: 'Jendela detail murid menyatukan catatan khusus dan riwayat pengerjaan kuis. Guru dapat melihat skor, persentase, waktu pengerjaan, dan waktu percobaan untuk memberi umpan balik individual atau menentukan kebutuhan remedial.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (3).png', title: 'Daftar konten mufrodat', description: 'CMS membagi konten menurut jenis dan jenjang kelas. Daftar bab mufrodat memperlihatkan judul Indonesia, judul Arab, jumlah kata, kontrol urutan, serta akses ke halaman pengelolaan isi setiap bab.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (4).png', title: 'Pengelolaan kosakata dalam bab', description: 'Guru menambahkan kata melalui isian teks Arab, transliterasi, arti, contoh kalimat, dan gambar ilustrasi. Daftar di sebelah kanan memungkinkan guru memeriksa, mengurutkan, atau menghapus kosakata agar isi bab tetap terstruktur.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (5).png', title: 'Penyuntingan topik muhadatsah', description: 'Formulir muhadatsah memuat judul, judul Arab, tingkat kesulitan, label unit, ikon, dan deskripsi. Dialog disusun berdasarkan giliran pembicara dan posisi balon percakapan agar alur percakapan mudah diikuti murid.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (6).png', title: 'Daftar materi dan capaian pembelajaran', description: 'Tab Materi menampilkan Capaian Pembelajaran dan Tujuan Pembelajaran untuk setiap jenjang. Guru dapat memperbarui acuan pembelajaran, menambah bab, mengubah urutannya, dan melihat jumlah blok konten pada setiap materi.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (7).png', title: 'Penyusunan blok materi', description: 'Isi materi dibangun secara modular menggunakan blok seperti teks dan tabel. Guru dapat menambah, mengurutkan, atau menghapus blok sehingga tujuan belajar, penjelasan, dialog, latihan, dan tugas tersusun dalam urutan pembelajaran yang jelas.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (8).png', title: 'Bank kuis berdasarkan tipe latihan', description: 'Bank kuis dikelompokkan menurut kelas dan tipe, seperti Listening Challenge, Tebak Kosakata, Penyusunan Kata, dan Teka-Teki Silang. Setiap bab menampilkan jumlah soal dan menyediakan kontrol untuk mengatur urutan maupun membuka pengelolaan soal.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (9).png', title: 'Pengelolaan soal Listening Challenge', description: 'Guru dapat menambahkan teks Arab, transliterasi, arti, dan penjelasan makna ke dalam bank soal menyimak. Daftar soal di sisi kanan memudahkan pemeriksaan isi, pengurutan butir, dan penghapusan soal yang tidak lagi digunakan.' },
  { chapter: 'guru', src: '/guru/Macbook-Air-lughati-arabic.vercel.app (10).png', title: 'Profil dan ringkasan mengajar guru', description: 'Halaman profil menampilkan identitas dan peran guru, pintasan menuju dashboard kelas serta CMS, jumlah kelas yang diampu, total murid, dan daftar kelas. Ringkasan ini memberi gambaran cepat tentang ruang lingkup pengajaran akun tersebut.' },
  { chapter: 'keamanan', image: 19, title: 'Cloud Firestore', description: 'Konsol Firestore memperlihatkan koleksi data kelas, catatan, course, guru, materi, mufrodat, dan kuis. Akses koleksi dilindungi melalui rules dan validasi peran.' }
];

const legacyQuiz = [
  { q: 'Langkah pertama sebelum merancang antarmuka multimedia pembelajaran adalah…', options: ['Melakukan analisis kebutuhan pengguna dan tujuan belajar', 'Langsung memilih warna', 'Membuat akun deployment', 'Menyalin seluruh fitur aplikasi lain'], answer: 0 },
  { q: 'Guru perlu memperbarui bahan ajar tanpa mengubah kode. Komponen yang paling tepat adalah…', options: ['Rapor', 'CMS', 'Service worker', 'Halaman profil'], answer: 1 },
  { q: 'Sebelum aplikasi dipublikasikan, bukti teknis yang paling relevan adalah…', options: ['Jumlah screenshot', 'Build produksi dan hasil pengujian berhasil', 'Nama repository', 'Pilihan warna antarmuka'], answer: 1 },
  { q: 'Umpan balik langsung pada kuis dirancang terutama untuk…', options: ['Menghapus nilai rendah', 'Membantu siswa mengenali kesalahan dan memperbaiki pemahaman', 'Menggantikan seluruh peran guru', 'Membuka hak akses pengelola'], answer: 1 },
  { q: 'Mengapa pembatasan peran harus diterapkan pada aturan backend?', options: ['Agar warna tombol konsisten', 'Karena menyembunyikan tombol saja tidak mencegah akses data tidak sah', 'Agar build lebih cepat', 'Supaya screenshot lebih rapi'], answer: 1 }
];

const emptyState = () => ({ checklist: [] });
const readState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== 'object') return emptyState();
    return {
      checklist: [...new Set(Array.isArray(saved.checklist) ? saved.checklist.filter(index => Number.isInteger(index) && index >= 0 && index < 6) : [])]
    };
  } catch { return emptyState(); }
};
const writeState = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

function shell(activeId, state) {
  const active = chapters.find(item => item.id === activeId) || chapters[0];
  return `
    <div class="emodul-app">
      <aside class="emodul-sidebar">
        <div class="emodul-brand"><a href="/"><span class="emodul-brand-icon" aria-hidden="true">${icon('book', { size: 24 })}</span><span><b>Kajian Jurnal</b><small>Kelompok 4</small></span></a><button type="button" class="emodul-sidebar-close" aria-label="Tutup daftar isi">${icon('x', { size: 20 })}</button></div>
        <nav class="emodul-nav" aria-label="Daftar kegiatan belajar">
          ${chapters.map(c => `<button class="${c.id === active.id ? 'is-active' : ''}" data-chapter="${c.id}"><span>${c.number}</span><span><small>${c.kicker}</small>${c.title}</span></button>`).join('')}
        </nav>
        <button class="emodul-nav-special" data-view="gallery">${icon('eye', { size: 18 })}<span>Bukti dan Dokumentasi<small>${documentation.length} gambar pendukung</small></span></button>
        <a class="emodul-back" href="/">${icon('chevronLeft', { size: 16 })} Kembali</a>
      </aside>
      <main class="emodul-main">
        <header class="emodul-topbar"><button class="emodul-menu" aria-label="Buka daftar isi">${icon('grip', { size: 22 })}</button><span>Kajian Jurnal · E-worksheet Berbasis Etnosains</span></header>
        <div class="emodul-content" id="emodul-content">${chapterMarkup(active, state)}</div>
      </main>
      <div class="emodul-overlay"></div>
      <div class="emodul-lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau gambar" aria-hidden="true" tabindex="-1"><button type="button" aria-label="Tutup pratinjau gambar">×</button><img alt=""><p></p></div>
      <div class="emodul-toast" role="status" aria-live="polite">${icon('checkCircle', { size: 19 })}<span></span></div>
    </div>`;
}

function chapterMarkup(chapter, state) {
  const index = chapters.indexOf(chapter);
  let body = chapter.body;
  if (chapter.id === 'evaluasi') {
    let checklistIndex = 0;
    body = body.replace(/<input type="checkbox">/g, () => {
      const itemIndex = checklistIndex++;
      return `<input type="checkbox" data-checklist-item="${itemIndex}" ${state.checklist.includes(itemIndex) ? 'checked' : ''}>`;
    });
  }
  return `<article class="emodul-chapter animate-fade-in">
    <div class="emodul-breadcrumb">Kajian Jurnal <span>/</span> Bagian ${chapter.number}</div>
    <section class="emodul-hero"><div><span class="emodul-pill">${chapter.kicker}</span><h1>${chapter.title}</h1><p>${chapter.objective}</p><div class="emodul-meta">${icon('info', { size: 16 })} ${chapter.duration} <span>•</span> Kegiatan ${index + 1} dari ${chapters.length}</div></div><div class="emodul-hero-number">${chapter.number}</div></section>
    <section class="emodul-objective"><span>${icon('target', { size: 22 })}</span><div><b>Tujuan Bagian</b><p>${chapter.objective}</p></div></section>
    <section class="emodul-reading">${body}</section>
    ${chapter.id === 'latar-belakang' ? pdfPreviewMarkup() : ''}
    ${documentationMarkup(chapter.id)}
    <footer class="emodul-chapter-footer"><button class="emodul-prev" ${index === 0 ? 'disabled' : ''} data-go="${chapters[index - 1]?.id || ''}">${icon('chevronLeft', { size: 17 })} Sebelumnya</button><button class="emodul-next" ${index === chapters.length - 1 ? 'disabled' : ''} data-go="${chapters[index + 1]?.id || ''}">Berikutnya ${icon('arrowRight', { size: 17 })}</button></footer>
  </article>`;
}

function pdfPreviewMarkup() {
  const pdfUrl = new URL('./review-jurnal/sinta-2.pdf', document.baseURI).href;
  return `<section class="emodul-pdf-preview" aria-labelledby="emodul-pdf-title">
    <div class="emodul-pdf-head"><div><span>Dokumen pendukung</span><h2 id="emodul-pdf-title">Preview PDF Sinta 2</h2><p>Dokumen dapat dibaca langsung tanpa meninggalkan Bagian 2.</p></div><a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Buka di tab baru</a></div>
    <object data="${pdfUrl}#view=FitH" type="application/pdf" aria-label="Preview PDF Sinta 2">
      <iframe src="${pdfUrl}#view=FitH" title="Preview PDF Sinta 2" loading="lazy"></iframe>
      <p>Browser tidak dapat menampilkan preview. <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Buka dokumen PDF</a>.</p>
    </object>
  </section>`;
}

function documentationMarkup(chapterId) {
  const items = documentation.filter(item => item.chapter === chapterId);
  if (!items.length) return '';
  return `<section class="emodul-docs"><div class="emodul-docs-head"><span>${icon('eye', { size: 20 })}</span><div><b>Bukti pendukung pada bagian ini</b><p>Amati visual dan hubungkan informasinya dengan identitas serta konteks artikel.</p></div></div>${items.map((item, index) => `<article class="emodul-doc-item"><figure role="${item.externalUrl ? 'link' : 'button'}" tabindex="0" aria-label="${item.externalUrl ? `${item.actionLabel || 'Buka di tab baru'}: ${item.title}` : `Perbesar ${item.title}`}" ${item.externalUrl ? `data-external-url="${item.externalUrl}"` : `data-lightbox="${documentationImage(item)}" data-caption="${item.title}"`}><img loading="lazy" decoding="async" src="${documentationImage(item)}" alt="${item.title}"><figcaption>Gambar ${index + 1}. ${item.title}<span>${item.externalUrl ? (item.actionLabel || 'Buka di tab baru') : 'Klik untuk memperbesar'}</span></figcaption></figure><div><span class="emodul-doc-label">Penjelasan gambar</span><h3>${item.title}</h3><p>${item.description}</p><ul><li><b>Fokus pengamatan:</b> identifikasi judul, penulis, jurnal, dan informasi publikasi.</li><li><b>Kaitan kajian:</b> gunakan visual sebagai bukti pendukung identitas artikel.</li></ul></div></article>`).join('')}</section>`;
}

function documentationImage(item) {
  return item.src || `/emodul/image${item.image}.png`;
}

function galleryMarkup() {
  return `<section class="emodul-gallery animate-fade-in"><div class="emodul-breadcrumb">Kajian Jurnal <span>/</span> Bukti dan Dokumentasi</div><h1>Bukti dan Dokumentasi Artikel</h1><p>Kumpulan visual pendukung dari folder konten, meliputi gambar utama serta rekam artikel pada portal GARUDA dan SINTA.</p><div class="emodul-gallery-grid">${documentation.map((item, i) => `<figure role="${item.externalUrl ? 'link' : 'button'}" tabindex="0" aria-label="${item.externalUrl ? `Buka ${item.title} di tab baru` : `Perbesar ${item.title}`}" ${item.externalUrl ? `data-external-url="${item.externalUrl}"` : `data-lightbox="${documentationImage(item)}" data-caption="${item.title}"`}><img loading="lazy" decoding="async" src="${documentationImage(item)}" alt="${item.title}"><figcaption><span>${String(i + 1).padStart(2, '0')}</span><div>${item.title}<small>${item.description}</small></div></figcaption></figure>`).join('')}</div></section>`;
}

export function renderEmodul() {
  const state = readState();
  return shell(chapters[0].id, state);
}

export function bindEmodulEvents(root) {
  let state = readState();
  const content = root.querySelector('#emodul-content');
  const sidebar = root.querySelector('.emodul-sidebar');
  const overlay = root.querySelector('.emodul-overlay');
  const lightbox = root.querySelector('.emodul-lightbox');
  const toast = root.querySelector('.emodul-toast');
  let focusBeforeDialog = null;

  // Sticky header harus merespons scroll dokumen (bukan scroll container lokal).
  // Listener melepas dirinya sendiri ketika view e-modul sudah tidak terpasang.
  const syncStickyHeader = () => {
    if (!root.isConnected) {
      window.removeEventListener('scroll', syncStickyHeader);
      return;
    }
    root.querySelector('.emodul-topbar')?.classList.toggle('is-scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', syncStickyHeader, { passive: true });
  syncStickyHeader();

  const closeMenu = () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('emodul-menu-open');
  };
  const openLightbox = trigger => {
    focusBeforeDialog = trigger;
    lightbox.querySelector('img').src = trigger.dataset.lightbox;
    lightbox.querySelector('img').alt = trigger.dataset.caption;
    lightbox.querySelector('p').textContent = trigger.dataset.caption;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.querySelector('button')?.focus();
  };
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.querySelector('img').removeAttribute('src');
    focusBeforeDialog?.focus();
    focusBeforeDialog = null;
  };
  const openExternalPage = trigger => {
    const openedWindow = window.open(trigger.dataset.externalUrl, '_blank', 'noopener,noreferrer');
    if (openedWindow) openedWindow.opener = null;
  };
  const keepFocusInDialog = (event, dialog) => {
    if (event.key !== 'Tab') return;
    const focusable = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(element => !element.disabled && element.getAttribute('aria-hidden') !== 'true');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const showToast = message => {
    toast.querySelector('span').textContent = message;
    toast.classList.add('is-visible');
    window.setTimeout(() => toast.classList.remove('is-visible'), 2800);
  };
  const copyPrompt = async button => {
    const prompt = button.closest('.emodul-prompt-card')?.querySelector('code')?.textContent.trim();
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      showToast('Prompt berhasil disalin.');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = prompt;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      const copied = document.execCommand('copy');
      textArea.remove();
      showToast(copied ? 'Prompt berhasil disalin.' : 'Prompt belum dapat disalin.');
    }
  };
  const togglePromptCard = details => {
    const panel = details.querySelector(':scope > div');
    if (!panel || details.dataset.animating === 'true') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      details.open = !details.open;
      return;
    }
    details.dataset.animating = 'true';
    if (details.open) {
      const startHeight = panel.getBoundingClientRect().height;
      const animation = panel.animate(
        [{ height: `${startHeight}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
        { duration: 230, easing: 'cubic-bezier(.4,0,.2,1)' }
      );
      animation.onfinish = () => {
        details.open = false;
        panel.style.height = '';
        panel.style.opacity = '';
        delete details.dataset.animating;
      };
    } else {
      details.open = true;
      const endHeight = panel.scrollHeight;
      const animation = panel.animate(
        [{ height: '0px', opacity: 0 }, { height: `${endHeight}px`, opacity: 1 }],
        { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' }
      );
      animation.onfinish = () => {
        panel.style.height = '';
        panel.style.opacity = '';
        delete details.dataset.animating;
      };
    }
  };
  const setActive = id => {
    root.querySelectorAll('.emodul-nav button').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.chapter === id);
    });
  };
  const showChapter = id => {
    const chapter = chapters.find(c => c.id === id) || chapters[0];
    content.innerHTML = chapterMarkup(chapter, state);
    setActive(chapter.id); closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const showView = view => {
    if (view !== 'gallery') return;
    content.innerHTML = galleryMarkup();
    root.querySelectorAll('.emodul-nav button').forEach(btn => btn.classList.remove('is-active'));
    closeMenu(); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  root.addEventListener('click', event => {
    const chapterBtn = event.target.closest('[data-chapter]');
    const viewBtn = event.target.closest('[data-view]');
    const goBtn = event.target.closest('[data-go]');
    const zoom = event.target.closest('[data-lightbox]');
    const externalLink = event.target.closest('[data-external-url]');
    const copyPromptButton = event.target.closest('.emodul-copy-prompt');
    const promptSummary = event.target.closest('.emodul-prompt-card > summary');
    if (promptSummary) {
      event.preventDefault();
      togglePromptCard(promptSummary.parentElement);
    }
    if (chapterBtn) showChapter(chapterBtn.dataset.chapter);
    if (viewBtn) showView(viewBtn.dataset.view);
    if (goBtn && !goBtn.disabled) chapters.some(c => c.id === goBtn.dataset.go) ? showChapter(goBtn.dataset.go) : showView(goBtn.dataset.go);
    if (zoom) {
      openLightbox(zoom);
    }
    if (externalLink) openExternalPage(externalLink);
    if (event.target.closest('.emodul-menu')) {
      sidebar.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('emodul-menu-open');
    }
    if (event.target.closest('.emodul-sidebar-close')) closeMenu();
    if (event.target.closest('.emodul-back')) closeMenu();
    if (event.target === overlay) closeMenu();
    if (event.target.closest('.emodul-lightbox button')) closeLightbox();
    if (copyPromptButton) copyPrompt(copyPromptButton);
  });

  root.addEventListener('keydown', event => {
    const zoom = event.target.closest('[data-lightbox]');
    if (zoom && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openLightbox(zoom);
    }
    const externalLink = event.target.closest('[data-external-url]');
    if (externalLink && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      openExternalPage(externalLink);
    }
    if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
    if (lightbox.classList.contains('is-open')) keepFocusInDialog(event, lightbox);
  });

  root.addEventListener('change', event => {
    if (event.target.matches('.emodul-checklist input')) {
      const itemIndex = Number(event.target.dataset.checklistItem);
      event.target.closest('li').classList.toggle('is-checked', event.target.checked);
      state.checklist = event.target.checked
        ? [...new Set([...state.checklist, itemIndex])]
        : state.checklist.filter(index => index !== itemIndex);
      writeState(state);
    }
  });

}
