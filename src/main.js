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
    const heroes = ['hero-1', 'hero-2', 'hero-3', 'hero-4']
        .map(id => document.getElementById(id))
        .filter(Boolean);
    const heroBullets = document.querySelectorAll('.hero-bullet');

    if (!heroes.length) return;

    let index = 0;
    let isAnimating = false;

    const updateBullets = () => {
        if (!heroBullets.length) return;
        heroBullets.forEach((bullet, i) => {
            bullet.classList.toggle('bg-stone-900', i === index);
            bullet.classList.toggle('bg-transparent', i !== index);
        });
    };

    const showHero = (newIndex) => {
        if (newIndex === index || isAnimating) return;
        const prev = heroes[index];
        const next = heroes[newIndex];
        if (!next || !prev) return;

        isAnimating = true;

        next.classList.remove('hidden');
        next.classList.add('opacity-0');

        requestAnimationFrame(() => {
            prev.classList.add('opacity-0');
            next.classList.remove('opacity-0');

            setTimeout(() => {
                prev.classList.add('hidden');
                isAnimating = false;
            }, 700);
        });

        index = newIndex;
        updateBullets();
    };

    heroes.forEach((el, i) => {
        if (i === 0) {
            el.classList.remove('hidden', 'opacity-0');
        } else {
            el.classList.add('hidden', 'opacity-0');
        }
    });
    updateBullets();

    if (heroes.length === 1) return;

    window.nextHero = function() {
        const nextIndex = (index + 1) % heroes.length;
        showHero(nextIndex);
    };

    window.prevHero = function() {
        const nextIndex = (index - 1 + heroes.length) % heroes.length;
        showHero(nextIndex);
    };

    if (heroBullets.length) {
        heroBullets.forEach((bullet) => {
            bullet.addEventListener('click', () => {
                const slideIndexAttr = bullet.getAttribute('data-hero-slide');
                if (!slideIndexAttr) return;
                const slideIndex = parseInt(slideIndexAttr, 10);
                if (Number.isNaN(slideIndex)) return;
                const normalizedIndex = ((slideIndex % heroes.length) + heroes.length) % heroes.length;
                showHero(normalizedIndex);
            });
        });
    }
});

function handleSubmit() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    alert('Запрос отправлен! (Это демо-версия)');
    form.reset();
}

