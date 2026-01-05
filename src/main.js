// SPA Logic
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if(target) target.classList.add('active');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function scrollToSection(id) {
    showPage('home');
    setTimeout(() => {
        const el = document.getElementById(id);
        if(el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }, 100);
}

// Product Logic
function openProduct(name, price, img) {
    document.getElementById('pd-title').innerText = name;
    document.getElementById('pd-price').innerText = price + ' ₽';
    document.getElementById('pd-image').src = img;
    showPage('product');
}

let cartItems = 2;
function addToCart() {
    cartItems++;
    document.getElementById('cart-count').innerText = cartItems;
    // Можно добавить визуальный эффект для кнопки
}

