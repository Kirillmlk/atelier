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

document.addEventListener('DOMContentLoaded', () => {
    const aboutButtons = document.querySelector('.product-about-tabs');
    const specsBtn = aboutButtons?.querySelector('button[data-tab="specs"]');
    const descBtn = aboutButtons?.querySelector('button[data-tab="description"]');
    const docsBtn = aboutButtons?.querySelector('button[data-tab="docs"]');
    const specsBlock = document.getElementById('about-specs');
    const descBlock = document.getElementById('about-desc');
    const docsBlock = document.getElementById('about-docs');

    if (!aboutButtons || !specsBtn || !descBtn || !specsBlock || !descBlock || !docsBtn || !docsBlock) return;

    const setTab = (tab) => {
        specsBtn.classList.remove('product-about-tab--active');
        descBtn.classList.remove('product-about-tab--active');
        docsBtn.classList.remove('product-about-tab--active');

        specsBlock.classList.add('hidden');
        descBlock.classList.add('hidden');
        docsBlock.classList.add('hidden');

        if (tab === 'specs') {
            specsBtn.classList.add('product-about-tab--active');
            specsBlock.classList.remove('hidden');
        } else if (tab === 'description') {
            descBtn.classList.add('product-about-tab--active');
            descBlock.classList.remove('hidden');
        } else if (tab === 'docs') {
            docsBtn.classList.add('product-about-tab--active');
            docsBlock.classList.remove('hidden');
        }
    };

    specsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setTab('specs');
    });

    descBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setTab('description');
    });

    docsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        setTab('docs');
    });

    const descShowMore = document.querySelector('#about-desc .product-about-more');
    const advantagesBlock = document.getElementById('about-advantages');

    if (descShowMore && advantagesBlock) {
        const labelSpan = descShowMore.querySelector('span');

        descShowMore.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = advantagesBlock.classList.contains('hidden');

            if (isHidden) {
                advantagesBlock.classList.remove('hidden');
                if (labelSpan) labelSpan.textContent = 'Скрыть';
            } else {
                advantagesBlock.classList.add('hidden');
                if (labelSpan) labelSpan.textContent = 'Показать ещё';
            }
        });
    }

    const specsMoreBtn = document.querySelector('#about-specs button[data-more="specs"]');
    const specsExtra = document.getElementById('about-specs-extra');

    if (specsMoreBtn && specsExtra) {
        const specsLabel = specsMoreBtn.querySelector('span');

        specsMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = specsExtra.classList.contains('hidden');

            if (isHidden) {
                specsExtra.classList.remove('hidden');
                if (specsLabel) specsLabel.textContent = 'Скрыть';
            } else {
                specsExtra.classList.add('hidden');
                if (specsLabel) specsLabel.textContent = 'Дополнительно';
            }
        });
    }
});
