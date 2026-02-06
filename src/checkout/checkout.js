function updateCheckoutSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const summaryEl = document.getElementById('checkout-summary');
    const totalEl = document.getElementById('checkout-total');
    
    if (!summaryEl || !totalEl) return;
    
    if (cart.length === 0) {
        summaryEl.innerHTML = `
      <div class="flex flex-col items-center justify-center text-center py-12 px-6 space-y-4 bg-stone-50 border border-dashed border-stone-200 rounded-xl">
        <p class="text-sm text-stone-600 font-medium">
          Не теряйте времени и взгляните на наш каталог товаров
        </p>
        <button
          type="button"
          onclick="window.location.href='/catalog.html'"
          class="bg-stone-900 text-white px-8 py-3 text-10px uppercase tracking-[0.25em] hover:bg-stone-800 transition-colors"
        >
          Начать покупки
        </button>
      </div>
    `;
        totalEl.textContent = '0 ₽';
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
    totalEl.textContent = total.toLocaleString('ru-RU') + ' ₽';
    
    summaryEl.innerHTML = cart.map((item, index) => {
        const qty = item.qty || 1;
        const itemTotal = item.price * qty;
        return `
        <div class="flex items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div class="w-16 h-16 bg-stone-100 shrink-0 overflow-hidden">
                <img src="${item.image || 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=200'}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-medium">${item.name}</p>
                ${item.material ? `<p class="text-stone-400 text-10px mt-1">${item.material}</p>` : ''}
            </div>
            <div class="flex items-center border border-stone-200 rounded-full px-2 py-1 shrink-0">
                <button onclick="updateCheckoutQty(${index}, -1)" class="p-1 hover:bg-stone-100 rounded transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14"></path>
                    </svg>
                </button>
                <span class="px-3 text-sm font-medium">${qty}</span>
                <button onclick="updateCheckoutQty(${index}, 1)" class="p-1 hover:bg-stone-100 rounded transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5v14"></path>
                    </svg>
                </button>
            </div>
            <span class="font-medium shrink-0 w-24 text-right">${itemTotal.toLocaleString('ru-RU')} ₽</span>
        </div>
    `;
    }).join('');
}

window.updateCheckoutQty = function(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart[index]) return;
    
    const newQty = (cart[index].qty || 1) + delta;
    if (newQty < 1) {
        removeFromCheckout(index);
        return;
    }
    
    cart[index].qty = newQty;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCheckoutSummary();
    
    if (window.updateCartDisplay) {
        window.updateCartDisplay();
    }
};

window.removeFromCheckout = function(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCheckoutSummary();
    
    if (window.updateCartDisplay) {
        window.updateCartDisplay();
    }
};

window.confirmOrder = function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('Корзина пуста');
        return;
    }
    alert('Заказ подтвержден! (Это демо-версия)');
};

document.addEventListener('DOMContentLoaded', () => {
    updateCheckoutSummary();

    const paymentMethods = document.querySelectorAll('.payment-method');
    if (paymentMethods.length) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('method-active'));
                method.classList.add('method-active');
            });
        });
    }

    const deliveryMethods = document.querySelectorAll('.delivery-method');
    if (deliveryMethods.length) {
        deliveryMethods.forEach(method => {
            method.addEventListener('click', () => {
                deliveryMethods.forEach(m => m.classList.remove('method-active'));
                method.classList.add('method-active');
            });
        });
    }
});

