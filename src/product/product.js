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
    const specsBtn = document.querySelector('button[data-tab="specs"]');
    const descBtn = document.querySelector('button[data-tab="description"]');
    const docsBtn = document.querySelector('button[data-tab="docs"]');
    const specsBlock = document.getElementById('about-specs');
    const descBlock = document.getElementById('about-desc');
    const docsBlock = document.getElementById('about-docs');

    if (!specsBtn || !descBtn || !specsBlock || !descBlock || !docsBtn || !docsBlock) return;

    const setTab = (tab) => {
        // Remove active classes
        [specsBtn, descBtn, docsBtn].forEach(btn => {
            btn.classList.remove('bg-neutral-900', 'border-neutral-900', 'text-white');
            btn.classList.add('bg-transparent', 'border-stone-200');
        });

        // Hide all blocks
        specsBlock.classList.add('hidden');
        descBlock.classList.add('hidden');
        docsBlock.classList.add('hidden');

        // Activate selected tab
        if (tab === 'specs') {
            specsBtn.classList.remove('bg-transparent', 'border-stone-200');
            specsBtn.classList.add('bg-neutral-900', 'border-neutral-900', 'text-white');
            specsBlock.classList.remove('hidden');
        } else if (tab === 'description') {
            descBtn.classList.remove('bg-transparent', 'border-stone-200');
            descBtn.classList.add('bg-neutral-900', 'border-neutral-900', 'text-white');
            descBlock.classList.remove('hidden');
        } else if (tab === 'docs') {
            docsBtn.classList.remove('bg-transparent', 'border-stone-200');
            docsBtn.classList.add('bg-neutral-900', 'border-neutral-900', 'text-white');
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

    // "Показать ещё" button in description
    const descShowMore = document.querySelector('#about-desc button.w-fit');
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

    // "Дополнительно" button in specs
    const specsMoreBtn = document.querySelector('button[data-more="specs"]');
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

    // "Подробнее" link for color info
    const colorInfoLink = document.getElementById('color-info-link');
    const colorInfoPopup = document.getElementById('color-info-popup');

    if (colorInfoLink && colorInfoPopup) {
        colorInfoLink.addEventListener('click', (e) => {
            e.preventDefault();
            const isHidden = colorInfoPopup.classList.contains('hidden');
            
            if (isHidden) {
                colorInfoPopup.classList.remove('hidden');
                colorInfoLink.textContent = 'Скрыть';
            } else {
                colorInfoPopup.classList.add('hidden');
                colorInfoLink.textContent = 'Подробнее';
            }
        });
    }
});
