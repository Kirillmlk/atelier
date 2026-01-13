function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.navigateTo = function(pageId) {
    showPage(pageId);
};

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById('page-' + hash)) {
        showPage(hash);
    }
});

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

document.addEventListener('DOMContentLoaded', () => {
    const progress = document.getElementById('loader-progress');
    const loader = document.getElementById('loader');
    
    if (progress && loader) {
        progress.style.transition = 'width 1s ease-out';
        progress.style.width = '100%';

        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }, 1000);
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

            // Перезапуск анимации для элементов слайда
            const animatedElements = next.querySelectorAll('.animate-slide-up');
            animatedElements.forEach((el, i) => {
                el.style.animation = 'none';
                requestAnimationFrame(() => {
                    el.style.animation = '';
                });
            });

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

    let autoSlideInterval = null;

    const startAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
        autoSlideInterval = setInterval(() => {
            if (!isAnimating) {
                const nextIndex = (index + 1) % heroes.length;
                showHero(nextIndex);
            }
        }, 5000);
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };

    window.nextHero = function() {
        const nextIndex = (index + 1) % heroes.length;
        showHero(nextIndex);
        startAutoSlide();
    };

    window.prevHero = function() {
        const nextIndex = (index - 1 + heroes.length) % heroes.length;
        showHero(nextIndex);
        startAutoSlide();
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
                startAutoSlide();
            });
        });
    }

    startAutoSlide();
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

function getCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

let cart = getCart();

window.toggleCart = function() {
    const cartEl = document.getElementById('side-cart');
    if (!cartEl) return;

    if (cartEl.classList.contains('cart-open')) {
        cartEl.classList.remove('cart-open');
        document.body.style.overflow = '';
    } else {
        cartEl.classList.add('cart-open');
        document.body.style.overflow = 'hidden';
    }
};

function updateCartDisplay() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');

    if (!cartItemsEl || !cartTotalEl) return;

    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = total.toLocaleString('ru-RU') + ' ₽';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<p class="text-[10px] uppercase tracking-widest text-stone-400 text-center py-20">Ваша корзина пока пуста</p>';
    } else {
        cartItemsEl.innerHTML = cart.map((item, index) => `
      <div class="flex gap-6">
        <div class="w-20 h-20 bg-stone-100 shrink-0">
          <img src="${item.image}" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow">
          <h5 class="text-xs font-medium uppercase tracking-widest">${item.name}</h5>
          ${item.material ? `<p class="text-[10px] text-stone-400 mt-1 italic">${item.material}</p>` : ''}
          <div class="flex justify-between items-center mt-4">
            <span class="text-xs">${item.price.toLocaleString('ru-RU')}&nbsp;₽</span>
            <button onclick="removeFromCart(${index})" class="text-[9px] uppercase tracking-widest border-b border-stone-200">Удалить</button>
          </div>
        </div>
      </div>
    `).join('');
    }
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart(cart);
    updateCartDisplay();
};

function addProductToCart(name, price) {
    const mainImg = document.getElementById('pd-image');
    let imageUrl = 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200';
    if (mainImg && mainImg.src) {
        imageUrl = mainImg.src.replace('w=1000', 'w=200').replace('q=80&w=1000', 'q=80&w=200');
    }

    const materialText = document.querySelector('.text-xs.text-stone-400.leading-relaxed.font-light.italic');
    const material = materialText ? materialText.textContent.split('.')[0].trim() : '';

    const product = {
        id: Date.now(),
        name: name,
        price: price,
        image: imageUrl,
        material: material
    };

    cart.push(product);
    saveCart(cart);
    updateCartDisplay();
    window.toggleCart();
}

window.addToCart = function(product) {
    if (typeof product === 'object' && product.id) {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200',
            material: product.category || ''
        };
        cart.push(cartProduct);
        saveCart(cart);
        updateCartDisplay();
        window.toggleCart();
    }
};

function addToCart() {
    const titleEl = document.getElementById('pd-title');
    const priceEl = document.getElementById('pd-price');
    if (!titleEl || !priceEl) return;

    const name = titleEl.innerText || '';
    const priceText = (priceEl.innerText || '').replace(/[^\d]/g, '');
    const price = parseInt(priceText, 10) || 0;

    if (!name || !price) return;

    addProductToCart(name, price);
}

document.addEventListener('DOMContentLoaded', () => {
    cart = getCart();
    updateCartDisplay();
});

window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    
    mobileMenu.classList.toggle('hidden');
};

window.toggleChatWindow = function() {
    const chatButton = document.getElementById('chat-button');
    const chatWindow = document.getElementById('chat-window');
    if (!chatButton || !chatWindow) return;
    
    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        chatButton.classList.add('hidden');
    } else {
        chatWindow.classList.add('hidden');
        chatButton.classList.remove('hidden');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', () => {
            window.toggleChatWindow();
        });
    }
});

