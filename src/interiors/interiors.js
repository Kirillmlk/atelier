const masonryItems = [
    { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop', title: 'Pure Silence', category: 'Свет и воздух', description: 'Просторное пространство с акцентом на естественное освещение и воздушность интерьера.', tags: ['Свет', 'Воздух', 'Минимализм'] },
    { src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop', title: 'Velvet Shadows', category: 'Глубокие текстуры', description: 'Интерьер с богатыми текстурами и глубокими оттенками, создающими уютную атмосферу.', tags: ['Бархат', 'Текстуры', 'Уют'] },
    { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop', title: 'Stone & Silk', category: 'Акценты', description: 'Сочетание натурального камня и мягких тканей для создания контраста.', tags: ['Камень', 'Шелк', 'Контраст'] },
    { src: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=800&auto=format&fit=crop', title: 'The Social Heart', category: 'Кухни-столовые', description: 'Пространство для общения и совместных трапез, где кухня становится центром дома.', tags: ['Кухня', 'Столовая', 'Общение'] },
    { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800', title: 'Spa Ritual', category: 'Релакс', description: 'Зона для отдыха и восстановления, созданная по принципам спа-пространств.', tags: ['Релакс', 'Спа', 'Отдых'] },
    { src: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800', title: 'Raw Marble', category: 'Материалы', description: 'Использование натурального мрамора в его первозданной красоте.', tags: ['Мрамор', 'Натуральность', 'Роскошь'] },
    { src: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=800', title: 'Idea Flow', category: 'Кабинеты', description: 'Рабочее пространство, способствующее творчеству и продуктивности.', tags: ['Кабинет', 'Работа', 'Творчество'] },
    { src: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&q=80&w=800', title: 'Vertical Living', category: 'Пространство', description: 'Максимальное использование вертикального пространства для создания ощущения простора.', tags: ['Высота', 'Простор', 'Архитектура'] },
    { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80&w=800', title: 'Modern Elegance', category: 'Современность', description: 'Современный интерьер с элементами классической элегантности.', tags: ['Современность', 'Элегантность'] },
    { src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800', title: 'Warm Minimalism', category: 'Минимализм', description: 'Минималистичный интерьер с теплыми акцентами для создания уюта.', tags: ['Минимализм', 'Тепло', 'Уют'] },
    { src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=800', title: 'Natural Harmony', category: 'Природа', description: 'Гармония с природой через использование натуральных материалов и цветов.', tags: ['Природа', 'Гармония', 'Эко'] },
    { src: 'https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&q=80&w=800', title: 'Luxury Details', category: 'Роскошь', description: 'Детали, которые создают ощущение роскоши и изысканности.', tags: ['Роскошь', 'Детали', 'Изысканность'] },
    { src: 'https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=800', title: 'Cozy Corner', category: 'Уют', description: 'Уютный уголок для отдыха и чтения.', tags: ['Уют', 'Отдых', 'Чтение'] },
    { src: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800', title: 'Artistic Space', category: 'Искусство', description: 'Пространство, где искусство встречается с функциональностью.', tags: ['Искусство', 'Функциональность'] },
    { src: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=800', title: 'Timeless Design', category: 'Классика', description: 'Вневременной дизайн, который не выйдет из моды.', tags: ['Классика', 'Вневременность'] },
    { src: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800', title: 'Serene Atmosphere', category: 'Спокойствие', description: 'Спокойная атмосфера для расслабления и медитации.', tags: ['Спокойствие', 'Медитация'] }
];

const categories = [
    { id: 'all', label: 'Все проекты' },
    { id: 'kitchen', label: 'Кухни' },
    { id: 'living', label: 'Гостиные & Мягкая' },
    { id: 'bedroom', label: 'Спальни' },
    { id: 'kids', label: 'Детские' },
    { id: 'storage', label: 'Шкафы & Хранение' }
];

let currentFilter = 'all';
let currentIndex = 0;
let currentItems = masonryItems;

const elements = {
    grid: document.getElementById('gallery-grid'),
    filters: document.getElementById('filter-container'),
    lightbox: document.getElementById('lightbox'),
    img: document.getElementById('lightbox-img'),
    title: document.getElementById('lightbox-title'),
    desc: document.getElementById('lightbox-desc'),
    cat: document.getElementById('lightbox-category'),
    tags: document.getElementById('lightbox-tags')
};

document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    initChart();
    initMasonryClickHandlers();
    initIntersectionObserver();
});

function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('active'));
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function initMasonryClickHandlers() {
    document.querySelectorAll('#gallery-grid .masonry-item img').forEach((img, index) => {
        const item = img.closest('.masonry-item');
        if (item) {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openLightbox(index, masonryItems));
        }
    });
}

function renderFilters() {
    elements.filters.innerHTML = categories.map(cat => `
        <button onclick="filterGallery('${cat.id}')" class="filter-btn px-6 py-2 rounded-full text-sm transition-all duration-300 border border-transparent hover:border-plum-200 ${cat.id === currentFilter ? 'bg-plum-800 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-50'}" data-cat="${cat.id}">
            ${cat.label}
        </button>
    `).join('');
}

window.filterGallery = (catId) => {
    currentFilter = catId;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('bg-plum-800', btn.dataset.cat === catId);
        btn.classList.toggle('text-white', btn.dataset.cat === catId);
        btn.classList.toggle('shadow-md', btn.dataset.cat === catId);
        btn.classList.toggle('bg-white', btn.dataset.cat !== catId);
        btn.classList.toggle('text-stone-600', btn.dataset.cat !== catId);
    });

    const portfolioItems = [];
    currentItems = catId === 'all' ? portfolioItems : portfolioItems.filter(item => item.category === catId);
    elements.grid.innerHTML = '';
    
    currentItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-item group relative overflow-hidden rounded-sm shadow-sm hover:shadow-xl cursor-pointer bg-white aspect-[4/5]';
        card.onclick = () => openLightbox(index, currentItems);
        card.innerHTML = `
            <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transition duration-700 ease-in-out group-hover:scale-110">
            <div class="overlay absolute inset-0 bg-plum-900/80 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-6">
                <span class="text-plum-200 text-xs tracking-widest uppercase mb-2 font-medium translate-y-4 group-hover:translate-y-0 transition duration-500 delay-100">${categories.find(c => c.id === item.category)?.label || 'Интерьер'}</span>
                <h3 class="text-white text-xl serif-font mb-2 translate-y-4 group-hover:translate-y-0 transition duration-500 delay-200">${item.title}</h3>
                <p class="text-plum-100 text-xs font-light translate-y-4 group-hover:translate-y-0 transition duration-500 delay-300 opacity-80">Нажмите, чтобы открыть</p>
            </div>
        `;
        elements.grid.appendChild(card);
    });
};

function openLightbox(index, items) {
    currentIndex = index;
    currentItems = items;
    updateLightboxContent();
    elements.lightbox.classList.remove('hidden');
    setTimeout(() => elements.lightbox.classList.remove('opacity-0'), 10);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    elements.lightbox.classList.add('opacity-0');
    setTimeout(() => elements.lightbox.classList.add('hidden'), 300);
    document.body.style.overflow = 'auto';
}

window.closeLightbox = closeLightbox;

function updateLightboxContent() {
    const item = currentItems[currentIndex];
    elements.img.src = item.src;
    elements.title.innerText = item.title;
    elements.desc.innerText = item.description;
    elements.cat.innerText = item.category || categories.find(c => c.id === item.category)?.label;
    elements.tags.innerHTML = item.tags.map(tag => `<span class="bg-stone-100 text-stone-500 text-10px px-2 py-1 rounded-sm uppercase tracking-wide border border-stone-200">${tag}</span>`).join('');
}

function navigate(direction) {
    if (!currentItems.length) currentItems = masonryItems;
    currentIndex = (currentIndex + direction + currentItems.length) % currentItems.length;
    updateLightboxContent();
}

document.getElementById('lightbox-next').onclick = (e) => { e.stopPropagation(); navigate(1); };
document.getElementById('lightbox-prev').onclick = (e) => { e.stopPropagation(); navigate(-1); };
document.getElementById('lightbox-close').onclick = closeLightbox;
elements.lightbox.onclick = (e) => e.target === elements.lightbox && closeLightbox();

document.addEventListener('keydown', (e) => {
    if (elements.lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft') navigate(-1);
});

function initChart() {
    const ctx = document.getElementById('projectsChart').getContext('2d');
    Chart.defaults.font.family = "'Montserrat', sans-serif";
    Chart.defaults.color = '#57534e';

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Кухни', 'Спальни', 'Мягкая мебель', 'Хранение', 'Детские'],
            datasets: [{
                data: [35, 20, 25, 12, 8],
                backgroundColor: ['#5c3746', '#86516a', '#a36b87', '#d5b5c7', '#e7e5e4'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { usePointStyle: true, padding: 20, font: { size: 12 } }
                },
                tooltip: {
                    backgroundColor: '#292524',
                    padding: 12,
                    titleFont: { family: 'Cormorant Garamond', size: 14 },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: (context) => ` ${context.label}: ${context.raw}% проектов`
                    }
                }
            },
            cutout: '65%',
            animation: { animateScale: true, animateRotate: true }
        }
    });
}
