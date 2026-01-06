function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSection(id) {
    showPage('home');
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }, 100);
}

function openProduct(name, price, img) {
    document.getElementById('pd-title').innerText = name;
    document.getElementById('pd-price').innerText = price + ' ₽';
    document.getElementById('pd-image').src = img;
    showPage('product');
}

let cartItems = 2;
function addToCart() {
    cartItems++;
    const badge = document.getElementById('cart-count') || document.getElementById('cart-badge');
    if (badge) badge.textContent = cartItems;
}

window.addEventListener('load', () => {
    const progress = document.getElementById('loader-progress');
    if (progress) {
        progress.style.width = '100%';

        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
        }, 1500);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // временно отключаем автопереключение hero-блоков
    return;
});


