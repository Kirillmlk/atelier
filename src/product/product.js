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

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const product = {
        id: Date.now(),
        name: name,
        price: price,
        image: imageUrl
    };

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
    
    if (window.toggleCart) {
        window.toggleCart();
    }
};

