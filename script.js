// DOM Elemanlarını Global Olarak Seçme
const container = document.getElementById("container");
const modal = document.getElementById("product-modal");
const closeModalButton = document.getElementById("close-btn");
const modalImage = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const modalStars = document.getElementById("modal-stars");

// Ürünleri Depolamak için Boş Dizi
let products = [];

// API'den Ürünleri Çekme Fonksiyonu
async function fetchProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        products = data;
        renderProductCards(products, container);
    } catch (error) {
        console.error('Veri çekerken hata oluştu:', error);
    }
}

// Ürün Kartlarını Oluşturma ve Ekleme Fonksiyonu
function renderProductCards(products, container) {
    container.innerHTML = ''; // Önceki kartları temizle

    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Ürün Kartı Oluşturma Fonksiyonu
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "cards";

    const image = document.createElement("img");
    image.className = "image";
    image.src = product.image;
    image.alt = "Product Image";

    const details = document.createElement("div");
    details.className = "details";

    const productName = document.createElement("span");
    productName.className = "product-name";
    productName.textContent = product.title;

    const starsDiv = createStars(product.rating.rate, product.rating.count);

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = `${product.price}$`;

    const button = document.createElement("button");
    button.className = "view-details-btn";
    button.textContent = "Sepete ekle";
    button.addEventListener("click", () => showModal(product, modal, modalImage, modalName, modalDescription, modalPrice, modalStars));

    details.append(productName, starsDiv, price, button);
    card.append(image, details);

    return card;
}

// Yıldızları ve Puan Sayısını Oluşturma Fonksiyonu
function createStars(rate, count) {
    const starsDiv = document.createElement("div");
    starsDiv.className = "stars";

    const fullStar = Math.floor(rate);
    const emptyStar = 5 - fullStar;

    for (let i = 0; i < fullStar; i++) {
        const fullStarSpan = document.createElement("span");
        fullStarSpan.className = "full-star";
        fullStarSpan.innerHTML = "&#9733;";
        starsDiv.appendChild(fullStarSpan);
    }
    for (let i = 0; i < emptyStar; i++) {
        const emptyStarSpan = document.createElement("span");
        emptyStarSpan.className = "empty-star";
        emptyStarSpan.innerHTML = "&#9734;";
        starsDiv.appendChild(emptyStarSpan);
    }

    const ratingCount = document.createElement("span");
    ratingCount.className = "rating-count";
    ratingCount.textContent = count;
    starsDiv.appendChild(ratingCount);

    return starsDiv;
}

// Modalı Gösterme Fonksiyonu
function showModal(product, modal, modalImage, modalName, modalDescription, modalPrice, modalStars) {
    modalImage.src = product.image;
    modalName.textContent = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = `${product.price}$`;

    modalStars.innerHTML = ''; // Önceki yıldızları temizle
    const stars = createStars(product.rating.rate, product.rating.count);
    modalStars.appendChild(stars);

    modal.style.display = "block";
}

// Modalı Kapatma Fonksiyonu
function closeModal(modal) {
    modal.style.display = "none";
}

// Olay Dinleyicisi
closeModalButton.addEventListener("click", () => closeModal(modal));

// Sayfa Yüklendiğinde Ürünleri Getir
fetchProducts();
