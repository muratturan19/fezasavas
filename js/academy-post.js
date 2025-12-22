const articleRoot = document.querySelector('[data-article-slug]');
const slug = articleRoot?.dataset.articleSlug;

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

const renderArticle = (frontmatter, markdown) => {
    const title = document.getElementById('article-title');
    const description = document.getElementById('article-description');
    const dateEl = document.getElementById('article-date');
    const tagsEl = document.getElementById('article-tags');
    const coverEl = document.getElementById('article-cover');
    const contentEl = document.getElementById('article-content');

    if (title && frontmatter.title) title.textContent = frontmatter.title;
    if (description && frontmatter.description) description.textContent = frontmatter.description;
    if (dateEl && frontmatter.date) dateEl.textContent = formatDate(frontmatter.date);

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

const loadArticle = async () => {
    if (!slug) return;
    try {
        const response = await fetch(`../content/academy/${slug}.md`);
        if (!response.ok) {
            throw new Error('Makale bulunamadı.');
        }
        const markdown = await response.text();
        const { data, content } = parseFrontmatter(markdown);
        if (data.published === false) {
            const contentEl = document.getElementById('article-content');
            if (contentEl) {
                contentEl.textContent = 'Makale bulunamadı.';
            }
            document.title = 'Makale bulunamadı - Feza Savaş';
            return;
        }
        renderArticle(data, content);
    } catch (error) {
        const contentEl = document.getElementById('article-content');
        if (contentEl) {
            contentEl.textContent = 'Makale yüklenemedi.';
        }
    }
};

loadArticle();
