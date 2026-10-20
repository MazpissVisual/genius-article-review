import { icon } from '../icons.js';
import { reviewChapters as chapters, reviewDocumentation as documentation } from '../data/review-content.js';

function shell(activeId) {
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
        <header class="emodul-topbar"><button class="emodul-menu" aria-label="Buka daftar isi">${icon('grip', { size: 22 })}</button><span>Kajian Jurnal · Model GENIUS Ekonomi Hijau dan Numerasi</span></header>
        <div class="emodul-content" id="emodul-content">${chapterMarkup(active)}</div>
      </main>
      <div class="emodul-overlay"></div>
      <div class="emodul-lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau gambar" aria-hidden="true" tabindex="-1"><button type="button" aria-label="Tutup pratinjau gambar">×</button><img alt=""><p></p></div>
    </div>`;
}

function chapterMarkup(chapter) {
  const index = chapters.indexOf(chapter);
  return `<article class="emodul-chapter animate-fade-in">
    <div class="emodul-breadcrumb">Kajian Jurnal <span>/</span> Bagian ${chapter.number}</div>
    <section class="emodul-hero"><div><span class="emodul-pill">${chapter.kicker}</span><h1>${chapter.title}</h1><p>${chapter.objective}</p><div class="emodul-meta">${icon('info', { size: 16 })} ${chapter.duration} <span>•</span> Kegiatan ${index + 1} dari ${chapters.length}</div></div><div class="emodul-hero-number">${chapter.number}</div></section>
    <section class="emodul-objective"><span>${icon('target', { size: 22 })}</span><div><b>Tujuan Bagian</b><p>${chapter.objective}</p></div></section>
    <section class="emodul-reading">${chapter.body}</section>
    ${chapter.id === 'latar-belakang' ? pdfPreviewMarkup() : ''}
    ${documentationMarkup(chapter.id)}
    <footer class="emodul-chapter-footer"><button class="emodul-prev" ${index === 0 ? 'disabled' : ''} data-go="${chapters[index - 1]?.id || ''}">${icon('chevronLeft', { size: 17 })} Sebelumnya</button><button class="emodul-next" ${index === chapters.length - 1 ? 'disabled' : ''} data-go="${chapters[index + 1]?.id || ''}">Berikutnya ${icon('arrowRight', { size: 17 })}</button></footer>
  </article>`;
}

function pdfPreviewMarkup() {
  const pdfUrl = new URL('./review-jurnal/artikel.pdf', document.baseURI).href;
  return `<section class="emodul-pdf-preview" aria-labelledby="emodul-pdf-title">
    <div class="emodul-pdf-head"><div><span>Dokumen pendukung</span><h2 id="emodul-pdf-title">Preview PDF Artikel</h2><p>Artikel lengkap dapat dibaca langsung tanpa meninggalkan Bagian 2.</p></div><a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Buka di tab baru</a></div>
    <object data="${pdfUrl}#view=FitH" type="application/pdf" aria-label="Preview PDF Artikel">
      <iframe src="${pdfUrl}#view=FitH" title="Preview PDF Artikel" loading="lazy"></iframe>
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
  return item.src;
}

function galleryMarkup() {
  return `<section class="emodul-gallery animate-fade-in"><div class="emodul-breadcrumb">Kajian Jurnal <span>/</span> Bukti dan Dokumentasi</div><h1>Bukti dan Dokumentasi Artikel</h1><p>Kumpulan visual pendukung dari folder konten, meliputi halaman artikel pada Springer Nature Link, halaman resmi jurnal, dan peringkat jurnal pada SCImago.</p><div class="emodul-gallery-grid">${documentation.map((item, i) => `<figure role="${item.externalUrl ? 'link' : 'button'}" tabindex="0" aria-label="${item.externalUrl ? `Buka ${item.title} di tab baru` : `Perbesar ${item.title}`}" ${item.externalUrl ? `data-external-url="${item.externalUrl}"` : `data-lightbox="${documentationImage(item)}" data-caption="${item.title}"`}><img loading="lazy" decoding="async" src="${documentationImage(item)}" alt="${item.title}"><figcaption><span>${String(i + 1).padStart(2, '0')}</span><div>${item.title}<small>${item.description}</small></div></figcaption></figure>`).join('')}</div></section>`;
}

export function renderEmodul() {
  return shell(chapters[0].id);
}

export function bindEmodulEvents(root) {
  const content = root.querySelector('#emodul-content');
  const sidebar = root.querySelector('.emodul-sidebar');
  const overlay = root.querySelector('.emodul-overlay');
  const lightbox = root.querySelector('.emodul-lightbox');
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
  const setActive = id => {
    root.querySelectorAll('.emodul-nav button').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.chapter === id);
    });
  };
  const showChapter = id => {
    const chapter = chapters.find(c => c.id === id) || chapters[0];
    content.innerHTML = chapterMarkup(chapter);
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

}
