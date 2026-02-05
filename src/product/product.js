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
    const aboutButtons = document.querySelector('.About_defaultButtons__yaIq_');
    const specsBtn = aboutButtons?.querySelector('button[data-tab="specs"]');
    const descBtn = aboutButtons?.querySelector('button[data-tab="description"]');
    const specsBlock = document.getElementById('about-specs');
    const descBlock = document.getElementById('about-desc');

    if (!aboutButtons || !specsBtn || !descBtn || !specsBlock || !descBlock) return;

    const setTab = (tab) => {
        specsBtn.classList.remove('About_active__viLm6');
        descBtn.classList.remove('About_active__viLm6');

        if (tab === 'specs') {
            specsBtn.classList.add('About_active__viLm6');
            specsBlock.classList.remove('hidden');
            descBlock.classList.add('hidden');
        } else {
            descBtn.classList.add('About_active__viLm6');
            descBlock.classList.remove('hidden');
            specsBlock.classList.add('hidden');
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

    // "Показать ещё / Скрыть" in description: toggle advantages block
    const descShowMore = document.querySelector('#about-desc .About_showMore__pMNrt');
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

    // "Дополнительно / Скрыть" in specs: toggle extra characteristics
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
