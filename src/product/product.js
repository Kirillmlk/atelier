window.changeImg = function(src, el) {
    const mainImg = document.getElementById('main-img');
    if (mainImg) {
        mainImg.src = src;
    }
    document.querySelectorAll('.grid.grid-cols-4 > div').forEach(d => {
        d.classList.remove('border-2', 'border-stone-800', 'p-1');
    });
    if (el) {
        el.classList.add('border-2', 'border-stone-800', 'p-1');
    }
};

window.addToCart = function(name, price) {
    const mainImg = document.getElementById('main-img');
    let imageUrl = 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=200';
    if (mainImg && mainImg.src) {
        imageUrl = mainImg.src.replace('w=1000', 'w=200').replace('q=80&w=1000', 'q=80&w=200');
    }

    const saved = localStorage.getItem('cart');
    const cart = saved ? JSON.parse(saved) : [];
    
    const product = {
        id: Date.now(),
        name: name,
        price: price,
        image: imageUrl
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartBadge = document.getElementById('cart-badge');

    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }

    if (cartTotalEl) {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotalEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
    }

    if (cartItemsEl) {
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
                        <div class="flex justify-between items-center mt-4">
                            <span class="text-xs">${item.price.toLocaleString('ru-RU')}&nbsp;₽</span>
                            <button onclick="removeFromCart(${index})" class="text-[9px] uppercase tracking-widest border-b border-stone-200">Удалить</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    if (window.toggleCart) {
        window.toggleCart();
    }
};

