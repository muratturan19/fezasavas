const LANGUAGE_STORAGE_KEY = 'fezaLanguage';
const LANGUAGE_EVENT = 'feza:languagechange';

const academyGrid = document.getElementById('academy-grid');
const academyEmpty = document.getElementById('academy-empty');
const tagFilters = document.getElementById('tag-filters');

const UI_TRANSLATIONS = {
    en: {
        all: 'All',
        readMore: 'Read →',
        loadError: 'Unable to load the academy list.',
        empty: 'No academy articles have been published yet.'
    },
    fr: {
        all: 'Tous',
        readMore: 'Lire →',
        loadError: 'Impossible de charger la liste de l’académie.',
        empty: 'Aucun article de l’académie n’a encore été publié.'
    }
};

const getCurrentLanguage = () => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) return stored;
    return document.documentElement.lang || 'tr';
};

const getLocale = (language) => {
    if (language === 'fr') return 'fr-FR';
    if (language === 'en') return 'en-US';
    return 'tr-TR';
};

const getTranslations = (language) => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

const formatDate = (dateString, language) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }
    return date.toLocaleDateString(getLocale(language), {
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

const renderCards = (posts, language) => {
    academyGrid.innerHTML = '';
    if (!posts.length) {
        academyEmpty.hidden = false;
        academyEmpty.textContent = getTranslations(language).empty;
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
                    <span>${formatDate(post.date, language)}</span>
                </div>
                <a class="academy-card-link" href="./${post.slug}.html">${getTranslations(language).readMore}</a>
            </div>
        `;

        academyGrid.appendChild(card);
    });
};

const renderFilters = (posts, onFilter, language) => {
    const tags = new Set();
    posts.forEach((post) => (post.tags || []).forEach((tag) => tags.add(tag)));

    tagFilters.innerHTML = '';
    const allButton = document.createElement('button');
    allButton.type = 'button';
    allButton.className = 'tag-filter is-active';
    allButton.textContent = getTranslations(language).all;
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

let cachedPosts = [];

const renderAcademy = (posts) => {
    const language = getCurrentLanguage();
    const handleFilter = (tag) => {
        if (!tag) {
            renderCards(posts, language);
            return;
        }
        const filtered = posts.filter((post) => (post.tags || []).includes(tag));
        renderCards(filtered, language);
    };

    renderFilters(posts, handleFilter, language);
    renderCards(posts, language);
};

const loadAcademy = async () => {
    try {
        const response = await fetch('../content/academy/index.json');
        if (!response.ok) {
            throw new Error('Akademi listesi yüklenemedi.');
        }
        const posts = await response.json();
        const visiblePosts = posts.filter((post) => post.published !== false);
        cachedPosts = visiblePosts
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        renderAcademy(cachedPosts);
    } catch (error) {
        academyEmpty.hidden = false;
        academyEmpty.textContent = getTranslations(getCurrentLanguage()).loadError;
    }
};

if (document) {
    document.addEventListener(LANGUAGE_EVENT, () => {
        if (cachedPosts.length) {
            renderAcademy(cachedPosts);
            return;
        }
        if (academyEmpty && !academyEmpty.hidden) {
            academyEmpty.textContent = getTranslations(getCurrentLanguage()).empty;
        }
    });
}

loadAcademy();
