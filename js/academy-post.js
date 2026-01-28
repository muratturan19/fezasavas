const fezaI18n = window.fezaI18n || {};
const LANGUAGE_STORAGE_KEY = fezaI18n.LANGUAGE_STORAGE_KEY || 'fezaLanguage';
const LANGUAGE_EVENT = fezaI18n.LANGUAGE_EVENT || 'feza:languagechange';

const UI_TRANSLATIONS = {
    tr: {
        notFound: 'Makale bulunamadı.',
        loadError: 'Makale yüklenemedi.'
    },
    en: {
        notFound: 'Article not found.',
        loadError: 'Unable to load the article.'
    },
    fr: {
        notFound: 'Article introuvable.',
        loadError: 'Impossible de charger l’article.'
    }
};

const articleRoot = document.querySelector('[data-article-slug]');
const slug = articleRoot?.dataset.articleSlug;

const getCurrentLanguage = fezaI18n.getCurrentLanguage || (() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored) return stored;
    return document.documentElement.lang || 'tr';
});

const getLocale = fezaI18n.getLocale || ((language) => {
    if (language === 'fr') return 'fr-FR';
    if (language === 'en') return 'en-US';
    return 'tr-TR';
});

const getTranslations = (language) => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

const parseFrontmatter = (markdown) => {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        return { data: {}, content: markdown };
    }

    const data = {};
    const lines = match[1].split('\n');
    let currentKey = null;

    lines.forEach((line) => {
        if (line.trim().startsWith('- ') && currentKey) {
            data[currentKey] = data[currentKey] || [];
            data[currentKey].push(line.replace('- ', '').trim());
            return;
        }

        const [key, ...rest] = line.split(':');
        if (!key || rest.length === 0) return;
        currentKey = key.trim();
        const value = rest.join(':').trim().replace(/^"|"$/g, '');
        if (value === 'true') {
            data[currentKey] = true;
        } else if (value === 'false') {
            data[currentKey] = false;
        } else {
            data[currentKey] = value;
        }
    });

    return { data, content: match[2].trim() };
};

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

let cachedFrontmatter = null;

const renderArticle = (frontmatter, markdown) => {
    const title = document.getElementById('article-title');
    const description = document.getElementById('article-description');
    const dateEl = document.getElementById('article-date');
    const tagsEl = document.getElementById('article-tags');
    const coverEl = document.getElementById('article-cover');
    const contentEl = document.getElementById('article-content');

    if (title && frontmatter.title) title.textContent = frontmatter.title;
    if (description && frontmatter.description) description.textContent = frontmatter.description;
    if (dateEl && frontmatter.date) dateEl.textContent = formatDate(frontmatter.date, getCurrentLanguage());

    if (tagsEl && Array.isArray(frontmatter.tags)) {
        tagsEl.innerHTML = '';
        frontmatter.tags.forEach((tag) => {
            const chip = document.createElement('span');
            chip.className = 'academy-tag';
            chip.textContent = tag;
            tagsEl.appendChild(chip);
        });
    }

    if (coverEl && frontmatter.coverImage) {
        coverEl.src = frontmatter.coverImage;
        coverEl.hidden = false;
    }

    if (contentEl) {
        if (window.marked) {
            contentEl.innerHTML = window.marked.parse(markdown);
        } else {
            contentEl.textContent = markdown;
        }
    }

    if (frontmatter.title) {
        document.title = `${frontmatter.title} - Feza Savaş`;
    }
};

const updateDate = () => {
    if (!cachedFrontmatter) return;
    const dateEl = document.getElementById('article-date');
    if (dateEl && cachedFrontmatter.date) {
        dateEl.textContent = formatDate(cachedFrontmatter.date, getCurrentLanguage());
    }
};

const loadArticle = async () => {
    if (!slug) return;
    try {
        // Fetch from GitHub to get latest content
        const githubUrl = `https://raw.githubusercontent.com/muratturan19/fezasavas/main/content/academy/${slug}.md`;
        let response = await fetch(githubUrl);

        // Fallback to local file if GitHub fetch fails
        if (!response.ok) {
            response = await fetch(`../content/academy/${slug}.md`);
        }

        if (!response.ok) {
            throw new Error('Makale bulunamadı.');
        }
        const markdown = await response.text();
        const { data, content } = parseFrontmatter(markdown);
        if (data.published === false) {
            const contentEl = document.getElementById('article-content');
            if (contentEl) {
                contentEl.textContent = getTranslations(getCurrentLanguage()).notFound;
            }
            document.title = `${getTranslations(getCurrentLanguage()).notFound} - Feza Savaş`;
            return;
        }
        cachedFrontmatter = data;
        renderArticle(data, content);
    } catch (error) {
        const contentEl = document.getElementById('article-content');
        if (contentEl) {
            contentEl.textContent = getTranslations(getCurrentLanguage()).loadError;
        }
    }
};

if (document) {
    document.addEventListener(LANGUAGE_EVENT, updateDate);
}

loadArticle();
