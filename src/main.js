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


    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const heroContainer = document.querySelector('#page-home > div.relative.h-screen');
    if (heroContainer) {
        heroContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) < minSwipeDistance) {
            return;
        }

        if (swipeDistance > 0) {

            window.prevHero();
        } else {

            window.nextHero();
        }
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
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartItemsEl || !cartTotalEl) return;

    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }

    const cartCount = document.getElementById('cart-count');
    const cartWord = document.getElementById('cart-word');
    
    if (cartCount && cartWord) {
        const count = cart.length;
        let word = 'товаров';
        if (count % 10 === 1 && count % 100 !== 11) {
            word = 'товар';
        } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
            word = 'товара';
        }
        cartCount.textContent = count;
        cartWord.textContent = word;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
    
    const bonusAlert = document.getElementById('bonus-alert');
    
    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        if (bonusAlert) {
            bonusAlert.classList.add('hidden');
        }
        const productsContainer = cartItemsEl.querySelector('.cart-products-list');
        if (productsContainer) {
            productsContainer.remove();
        }
    } else {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'none';
        }
        if (bonusAlert) {
            bonusAlert.classList.remove('hidden');
        }
        
        const itemsHtml = cart.map((item, index) => `
          <div class="flex gap-6 border-b border-stone-100 pb-4 last:border-b-0">
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
        
        let productsContainer = cartItemsEl.querySelector('.cart-products-list');
        if (!productsContainer) {
            productsContainer = document.createElement('div');
            productsContainer.className = 'cart-products-list space-y-8';
            cartItemsEl.appendChild(productsContainer);
        }
        productsContainer.innerHTML = itemsHtml;
    }
}

window.updateCartDisplay = updateCartDisplay;

window.removeFromCart = function(index) {
    const product = cart[index];
    if (!product) return;
    
    const modal = document.getElementById('delete-modal-overlay');
    const productNameEl = document.getElementById('delete-product-name');
    const confirmBtn = document.getElementById('confirm-delete-btn');
    
    if (!modal || !productNameEl || !confirmBtn) return;
    
    productNameEl.textContent = product.name;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    confirmBtn.onclick = function() {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartDisplay();
        closeDeleteModal();
        showNotification('Товар удален из корзины');
    };
};

function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification-toast');
    const notificationText = document.getElementById('notification-text');
    
    if (!notification || !notificationText) return;
    
    notificationText.textContent = message;
    notification.setAttribute('data-test-site', type);
    notification.classList.remove('hidden', 'translate-x-[400px]', 'opacity-0');
    
    setTimeout(() => {
        notification.classList.add('translate-x-[400px]', 'opacity-0');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 3000);
}

window.addToCart = function(productOrName, price) {
    let product;

    if (typeof productOrName === 'object' && productOrName !== null) {
        product = {
            id: productOrName.id || Date.now(),
            name: productOrName.name,
            price: productOrName.price,
            image: productOrName.image || 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200',
            material: productOrName.category || productOrName.material || ''
        };
    } else {
        let name = productOrName;
        let productPrice = price;

        if (!name) {
            const titleEl = document.getElementById('pd-title');
            const priceEl = document.getElementById('pd-price');
            if (!titleEl || !priceEl) return;
            name = titleEl.innerText || '';
            const priceText = (priceEl.innerText || '').replace(/[^\d]/g, '');
            productPrice = parseInt(priceText, 10) || 0;
        } else if (typeof productPrice === 'string') {
            productPrice = parseInt(productPrice.replace(/[^\d]/g, ''), 10) || 0;
        }

        if (!name || !productPrice) return;

        const mainImg = document.getElementById('pd-image');
        const imageUrl = mainImg?.src?.replace('w=1000', 'w=200') || 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200';
        const materialText = document.querySelector('.text-xs.text-stone-400.leading-relaxed.font-light.italic');
        const material = materialText?.textContent.split('.')[0].trim() || '';

        product = {
            id: Date.now(),
            name: name,
            price: productPrice,
            image: imageUrl,
            material: material
        };
    }

    cart.push(product);
    saveCart(cart);
    updateCartDisplay();
    showNotification('Товар добавлен в корзину');
    window.toggleCart();
};

document.addEventListener('DOMContentLoaded', () => {
    cart = getCart();
    updateCartDisplay();
});

window.toggleMobileMenu = function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    
    mobileMenu.classList.toggle('menu-open');
    if (mobileMenu.classList.contains('menu-open')) {
        mobileMenu.classList.remove('hidden');
    } else {
        setTimeout(() => {
            if (!mobileMenu.classList.contains('menu-open')) {
                mobileMenu.classList.add('hidden');
            }
        }, 300);
    }
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

window.openAuthModal = function() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeAuthModal = function() {
    const overlay = document.getElementById('auth-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
};

window.closeDeleteModal = function() {
    const overlay = document.getElementById('delete-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
};

