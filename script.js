document.addEventListener("DOMContentLoaded", () => {
    const books = [
        { title: "Novel Fantasi", description: "Cerita epik penuh keajaiban.", price: 75000, image: "novel_fantasi.jpg" },
        { title: "Motivasi Hidup", description: "Buku yang menginspirasi hidup.", price: 160000, image: "motivasi_hidup.jpg" },
        { title: "Ensiklopedia Anak", description: "Ensiklopedia untuk anak-anak.", price: 90000, image: "ensiklopedia_anak.jpg" },
        { title: "Komik Seru", description: "Komik penuh petualangan.", price: 50000, image: "komik-seru.jpg" },
        { title: "Buku Memasak", description: "Resep masakan terbaik.", price: 90000, image: "buku-memasak.jpg" },
        { title: "Kisah Tokoh", description: "Biografi inspiratif.", price: 70000, image: "kisah-tokoh.jpg" },
        { title: "Kamus Lengkap", description: "Panduan bahasa terkini.", price: 85000, image: "kamus-lengkap.jpg" },
        { title: "Buku Sains", description: "Pengetahuan ilmiah terkini.", price: 100000, image: "buku-sains.jpg" },
        { title: "Cerita Rakyat", description: "Legenda dari berbagai daerah.", price: 60000, image: "cerita-rakyat.jpg" },
        { title: "Buku Anak", description: "Cerita seru untuk anak.", price: 55000, image: "buku-anak.jpg" },
        { title: "Buku Seni", description: "Pelajari seni dengan detail.", price: 75000, image: "buku-seni.jpg" },
        { title: "Fiksi Terbaik", description: "Kisah menarik penuh drama.", price: 80000, image: "fiksi-terbaik.jpg" },
        { title: "Buku Olahraga", description: "Tips olahraga terbaik.", price: 65000, image: "buku-olahraga.jpg" },
        { title: "Buku Sejarah", description: "Cerita dari masa lalu.", price: 90000, image: "buku-sejarah.jpg" },
        { title: "Buku Teknologi", description: "Kemajuan teknologi terkini.", price: 95000, image: "buku-teknologi.jpg" },
    ];

    const cart = [];
    const productList = document.querySelector(".produk-list");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const cartItems = document.getElementById("cart-items");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    // Menampilkan daftar buku di halaman produk
    function renderProducts(filteredBooks = books) {
        productList.innerHTML = "";
        filteredBooks.forEach((book, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("produk-item");

            productItem.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>${book.description}</p>
                <p>Harga: Rp ${book.price}</p>
                <button class="add-to-cart" data-index="${index}">Tambah ke Keranjang</button>
            `;
            productList.appendChild(productItem);
        });

        // Menambahkan event listener pada tombol "Tambah ke Keranjang"
        const addToCartButtons = document.querySelectorAll(".add-to-cart");
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const bookIndex = e.target.getAttribute("data-index");
                addToCart(parseInt(bookIndex));
            });
        });
    }

    // Menambahkan buku ke dalam keranjang
    function addToCart(index) {
        const book = books[index];
        cart.push(book);
        updateCart();
    }

    // Menghapus buku dari keranjang
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Memperbarui jumlah keranjang dan total harga
    function updateCart() {
        cartItems.innerHTML = cart.length > 0 ?
            cart.map((item, index) => `
                <div>
                    <p>${item.title} - Rp ${item.price} 
                    <button class="remove-item" data-index="${index}">Hapus</button></p>
                </div>
            `).join("") :
            "Keranjang Anda kosong.";

        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const bookIndex = e.target.getAttribute("data-index");
                removeFromCart(parseInt(bookIndex));
            });
        });

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalPrice.textContent = `Rp ${total}`;
        cartCount.textContent = cart.length;
    }

    // Fungsi pencarian buku berdasarkan judul
    function searchBooks() {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
        renderProducts(filteredBooks);
    }

    // Event listener untuk tombol search
    searchButton.addEventListener("click", searchBooks);

    // Event listener untuk pencarian dengan menekan Enter
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBooks();
        }
    });

    // Render produk pertama kali
    renderProducts();
});
