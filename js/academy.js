const academyGrid = document.getElementById('academy-grid');
const academyEmpty = document.getElementById('academy-empty');
const tagFilters = document.getElementById('tag-filters');

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }
    return date.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const createTagChip = (tag) => {
    const chip = document.createElement('span');
    chip.className = 'academy-tag';
    chip.textContent = tag;
    return chip;
};

const renderCards = (posts) => {
    academyGrid.innerHTML = '';
    if (!posts.length) {
        academyEmpty.hidden = false;
        return;
    }

    academyEmpty.hidden = true;
    posts.forEach((post) => {
        const card = document.createElement('article');
        card.className = 'academy-card';
        const imageMarkup = post.coverImage
            ? `<img src="${post.coverImage}" alt="${post.title}">`
            : '<img src="../images/feza.png" alt="Feza Savaş">';

        const tagsMarkup = (post.tags || [])
            .map((tag) => `<span class="academy-tag">${tag}</span>`)
            .join('');

        card.innerHTML = `
            ${imageMarkup}
            <div class="academy-card-body">
                <h3 class="academy-card-title">${post.title}</h3>
                <p class="academy-card-description">${post.description || ''}</p>
                <div class="academy-tags">${tagsMarkup}</div>
                <div class="academy-card-meta">
                    <span>${formatDate(post.date)}</span>
                </div>
                <a class="academy-card-link" href="./${post.slug}.html">Oku →</a>
            </div>
        `;

        academyGrid.appendChild(card);
    });
};

const renderFilters = (posts, onFilter) => {
    const tags = new Set();
    posts.forEach((post) => (post.tags || []).forEach((tag) => tags.add(tag)));

    tagFilters.innerHTML = '';
    const allButton = document.createElement('button');
    allButton.type = 'button';
    allButton.className = 'tag-filter is-active';
    allButton.textContent = 'Tümü';
    allButton.addEventListener('click', () => onFilter(''));
    tagFilters.appendChild(allButton);

    tags.forEach((tag) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'tag-filter';
        button.textContent = tag;
        button.addEventListener('click', () => onFilter(tag));
        tagFilters.appendChild(button);
    });

    tagFilters.addEventListener('click', (event) => {
        if (!(event.target instanceof HTMLButtonElement)) return;
        tagFilters.querySelectorAll('.tag-filter').forEach((button) => {
            button.classList.toggle('is-active', button === event.target);
        });
    });
};

const loadAcademy = async () => {
    try {
        const response = await fetch('../content/academy/index.json');
        if (!response.ok) {
            throw new Error('Akademi listesi yüklenemedi.');
        }
        const posts = await response.json();
        const visiblePosts = posts.filter((post) => post.published !== false);
        const sortedPosts = visiblePosts
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        const handleFilter = (tag) => {
            if (!tag) {
                renderCards(sortedPosts);
                return;
            }
            const filtered = sortedPosts.filter((post) => (post.tags || []).includes(tag));
            renderCards(filtered);
        };

        renderFilters(sortedPosts, handleFilter);
        renderCards(sortedPosts);
    } catch (error) {
        academyEmpty.hidden = false;
        academyEmpty.textContent = 'Akademi listesi yüklenemedi.';
    }
};

loadAcademy();
