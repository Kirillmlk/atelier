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
