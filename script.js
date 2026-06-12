// ===========================
//  NYAWITSKUY - script.js
// ===========================

// -----------------------------------------------
// BAGIAN 1: DATA SLIDE PROSES PENGOLAHAN SAWIT
// -----------------------------------------------

const slides = [
  {
    emoji: "🌿",
    tag: "Langkah 1",
    judul: "Pemanenan Tandan Buah Segar (TBS)",
    deskripsi:
      "Buah sawit dipanen dalam bentuk tandan buah segar (TBS) menggunakan egrek (alat potong bertangkai panjang). " +
      "Pemanenan dilakukan saat buah sudah matang — ditandai dengan 2–5 butir buah yang lepas dari tandan. " +
      "TBS yang baik memiliki berat sekitar 15–30 kg per tandan."
  },
  {
    emoji: "🚚",
    tag: "Langkah 2",
    judul: "Pengangkutan ke Pabrik (PKS)",
    deskripsi:
      "TBS harus segera diangkut ke Pabrik Kelapa Sawit (PKS) dalam waktu maksimal 24 jam setelah panen. " +
      "Keterlambatan pengangkutan dapat meningkatkan kadar Asam Lemak Bebas (ALB) yang menurunkan kualitas minyak. " +
      "Pengangkutan dilakukan menggunakan truk khusus."
  },
  {
    emoji: "🔥",
    tag: "Langkah 3",
    judul: "Sterilisasi (Perebusan TBS)",
    deskripsi:
      "TBS direbus dalam bejana bertekanan tinggi (sterilizer) menggunakan uap panas sekitar 130–140°C selama 60–90 menit. " +
      "Proses ini bertujuan untuk menghentikan aktivitas enzim perusak minyak, melunakkan daging buah, " +
      "dan memudahkan pemisahan brondolan dari tandan."
  },
  {
    emoji: "⚙️",
    tag: "Langkah 4",
    judul: "Penebahan (Threshing)",
    deskripsi:
      "TBS yang sudah direbus dimasukkan ke mesin penebah (thresher) yang berputar untuk memisahkan " +
      "brondolan (buah tunggal) dari janjangan kosong (tandan kosong). " +
      "Brondolan kemudian dilanjutkan ke proses ekstraksi, sedangkan janjangan kosong biasanya dijadikan pupuk organik."
  },
  {
    emoji: "🫙",
    tag: "Langkah 5",
    judul: "Pelumatan & Pengempaan (Digester & Press)",
    deskripsi:
      "Brondolan dilumatkan di dalam digester menggunakan pisau-pisau berputar pada suhu 90–95°C. " +
      "Hasil pelumatan kemudian diperas oleh mesin screw press untuk mengeluarkan minyak kasar (crude oil). " +
      "Pada tahap ini dihasilkan campuran minyak, air, dan padatan (fiber)."
  },
  {
    emoji: "🧪",
    tag: "Langkah 6",
    judul: "Pemurnian Minyak (Klarifikasi)",
    deskripsi:
      "Minyak kasar yang dihasilkan masih bercampur air dan kotoran. Proses klarifikasi memisahkan minyak " +
      "dari air dan lumpur melalui tangki pemisah (clarifier tank) dan centrifuge. " +
      "Hasil akhirnya adalah Crude Palm Oil (CPO) yang memiliki kandungan air dan kotoran rendah."
  },
  {
    emoji: "🫙",
    tag: "Langkah 7",
    judul: "Penyimpanan & Pengiriman CPO",
    deskripsi:
      "CPO yang sudah dimurnikan disimpan dalam tangki penyimpanan bersuhu sekitar 50–55°C agar tetap cair. " +
      "CPO kemudian dikirim ke kilang pengolahan lanjutan untuk diproses menjadi minyak goreng, " +
      "margarin, biodiesel, dan berbagai produk turunan lainnya."
  }
];

// -----------------------------------------------
// BAGIAN 2: LOGIKA SLIDESHOW
// -----------------------------------------------

let currentSlide = 0;

function renderSlide() {
  const data = slides[currentSlide];
  const total = slides.length;

  // Update konten slide
  document.getElementById("slideContent").innerHTML = `
    <span class="slide-emoji">${data.emoji}</span>
    <div class="slide-tag">${data.tag} dari ${total}</div>
    <h3>${data.judul}</h3>
    <p>${data.deskripsi}</p>
  `;

  // Update badge nomor
  document.getElementById("slideNumBadge").textContent = `${currentSlide + 1} / ${total}`;

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });

  // Update tombol prev/next
  document.getElementById("btnPrev").disabled = currentSlide === 0;
  document.getElementById("btnNext").disabled = currentSlide === total - 1;
}

function changeSlide(arah) {
  const total = slides.length;
  currentSlide = Math.max(0, Math.min(total - 1, currentSlide + arah));
  renderSlide();
}

function buatDots() {
  const container = document.getElementById("slideDots");
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.onclick = () => { currentSlide = i; renderSlide(); };
    container.appendChild(dot);
  });
}

// -----------------------------------------------
// BAGIAN 3: LOGIKA KONVERSI KG ke LITER
// -----------------------------------------------

// Rendemen (dalam %) dan densitas minyak sawit (kg/liter)
const dataMinyak = {
  cpo:    { rendemen: 0.22, densitas: 0.891, nama: "CPO (Crude Palm Oil)" },
  pko:    { rendemen: 0.04, densitas: 0.870, nama: "PKO (Palm Kernel Oil)" },
  goreng: { rendemen: 0.18, densitas: 0.920, nama: "Minyak Goreng Olahan" }
};

function hitungKonversi() {
  const inputEl = document.getElementById("inputKg");
  const jenis   = document.getElementById("selectJenis").value;
  const kg      = parseFloat(inputEl.value);

  if (!kg || kg <= 0) {
    alert("⚠️ Masukkan berat TBS yang valid (lebih dari 0 kg).");
    return;
  }

  const info     = dataMinyak[jenis];
  const kgMinyak = kg * info.rendemen;
  const liter    = kgMinyak / info.densitas;
  const persen   = (info.rendemen * 100).toFixed(0);

  document.getElementById("hasilKonversi").innerHTML = `
    <div class="result-data">
      <h3>📋 Hasil Estimasi Konversi</h3>
      <div class="result-row">
        <span class="result-label">Berat TBS masukan</span>
        <span class="result-value">${kg.toLocaleString("id-ID")} kg</span>
      </div>
      <div class="result-row">
        <span class="result-label">Jenis minyak</span>
        <span class="result-value">${info.nama}</span>
      </div>
      <div class="result-row">
        <span class="result-label">Rendemen minyak</span>
        <span class="result-value">${persen}%</span>
      </div>
      <div class="result-row">
        <span class="result-label">Berat minyak (kg)</span>
        <span class="result-value">${kgMinyak.toLocaleString("id-ID", { maximumFractionDigits: 2 })} kg</span>
      </div>
      <div class="result-row">
        <span class="result-label">🫙 Hasil minyak (liter)</span>
        <span class="result-value big">${liter.toLocaleString("id-ID", { maximumFractionDigits: 1 })} L</span>
      </div>
    </div>
  `;
}

// -----------------------------------------------
// BAGIAN 4: INISIALISASI SAAT HALAMAN DIMUAT
// -----------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  buatDots();
  renderSlide();
});
