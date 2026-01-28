import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

const DEFAULT_ADMIN_ORIGINS = [
    'https://fezasavas.com',
    'https://fezasavas.onrender.com'
];
const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN;
const normalizeOrigin = (origin) => origin.trim().replace(/\/+$/, '');
const resolvedAdminOrigins = (process.env.ADMIN_ORIGINS || ADMIN_ORIGIN || DEFAULT_ADMIN_ORIGINS.join(','))
    .split(/[,\s]+/)
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);
const ADMIN_ORIGINS = resolvedAdminOrigins.length ? resolvedAdminOrigins : DEFAULT_ADMIN_ORIGINS;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

const API_BASE = 'https://api.github.com';

if (!GITHUB_REPO) {
    console.warn('GITHUB_REPO env eksik. format: owner/repo');
}

const [REPO_OWNER, REPO_NAME] = (GITHUB_REPO || '/').split('/');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const requestOrigin = req.headers.origin ? normalizeOrigin(req.headers.origin) : undefined;
    const allowOrigin = ADMIN_ORIGINS.includes('*')
        ? '*'
        : (requestOrigin && ADMIN_ORIGINS.includes(requestOrigin) ? requestOrigin : ADMIN_ORIGINS[0]);
    if (allowOrigin) {
        res.setHeader('Access-Control-Allow-Origin', allowOrigin);
        res.setHeader('Vary', 'Origin');
    }
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    return next();
});

const requireAuth = (req, res, next) => {
    if (!ADMIN_USER || !ADMIN_PASSWORD) {
        return res.status(500).send('Admin kullanıcı bilgisi tanımlı değil.');
    }
    const authHeader = req.headers.authorization || '';
    const expected = `Basic ${Buffer.from(`${ADMIN_USER}:${ADMIN_PASSWORD}`).toString('base64')}`;
    if (authHeader !== expected) {
        return res.status(401).send('Yetkisiz.');
    }
    return next();
};

const slugify = (text) => text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .trim();

const githubRequest = async (endpoint, options = {}) => {
    if (!GITHUB_TOKEN) {
        throw new Error('GITHUB_TOKEN env eksik.');
    }
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'User-Agent': 'fezasavas-admin',
            Accept: 'application/vnd.github+json',
            ...(options.headers || {})
        }
    });

    return response;
};

const getRepoFile = async (filePath) => {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${GITHUB_BRANCH}`);
    if (response.status === 404) {
        return null;
    }
    if (!response.ok) {
        throw new Error(`GitHub dosyası alınamadı: ${filePath}`);
    }
    return response.json();
};

const createOrUpdateFile = async ({ filePath, content, message, sha }) => {
    const body = {
        message,
        content: Buffer.from(content).toString('base64'),
        branch: GITHUB_BRANCH
    };
    if (sha) {
        body.sha = sha;
    }

    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'PUT',
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub kaydı başarısız: ${text}`);
    }
    return response.json();
};

const deleteRepoFile = async ({ filePath, sha, message }) => {
    const response = await githubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}`, {
        method: 'DELETE',
        body: JSON.stringify({
            message,
            sha,
            branch: GITHUB_BRANCH
        })
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`GitHub silme başarısız: ${text}`);
    }
    return response.json();
};

const escapeFrontmatterValue = (value) => String(value || '').replace(/"/g, '\\"');

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
            data[currentKey].push(line.replace('- ', '').trim().replace(/^"|"$/g, ''));
            return;
        }

        const [key, ...rest] = line.split(':');
        if (!key || rest.length === 0) return;
        currentKey = key.trim();
        const rawValue = rest.join(':').trim().replace(/^"|"$/g, '');
        if (rawValue === 'true') {
            data[currentKey] = true;
        } else if (rawValue === 'false') {
            data[currentKey] = false;
        } else {
            data[currentKey] = rawValue;
        }
    });

    return { data, content: match[2].trim() };
};

const buildMarkdown = ({ title, date, description, tags, coverImage, published, body }) => {
    const frontmatterLines = [
        '---',
        `title: "${escapeFrontmatterValue(title)}"`,
        `date: "${escapeFrontmatterValue(date)}"`,
        `description: "${escapeFrontmatterValue(description)}"`
    ];

    if (coverImage) {
        frontmatterLines.push(`coverImage: "${escapeFrontmatterValue(coverImage)}"`);
    }

    frontmatterLines.push(`published: ${published ? 'true' : 'false'}`);

    if (tags && tags.length) {
        frontmatterLines.push('tags:');
        tags.forEach((tag) => frontmatterLines.push(`  - "${escapeFrontmatterValue(tag)}"`));
    }

    frontmatterLines.push('---');
    return `${frontmatterLines.join('\n')}\n${body.trim()}\n`;
};

const normalizePublished = (value, fallback = true) => {
    if (value === undefined || value === null || value === '') return fallback;
    if (typeof value === 'boolean') return value;
    return String(value).toLowerCase() !== 'false';
};

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.get('/posts', requireAuth, async (req, res) => {
    try {
        const existingIndex = await getRepoFile('content/academy/index.json');
        if (!existingIndex) {
            return res.json([]);
        }
        const content = Buffer.from(existingIndex.content, 'base64').toString('utf-8');
        const indexData = JSON.parse(content).map((post) => ({
            ...post,
            published: normalizePublished(post.published, true)
        }));
        return res.json(indexData);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Hata: ${error.message}`);
    }
});

app.get('/posts/:slug', requireAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const markdownPath = `content/academy/${slug}.md`;
        const existingMarkdown = await getRepoFile(markdownPath);
        if (!existingMarkdown) {
            return res.status(404).send('Makale bulunamadı.');
        }
        const markdownContent = Buffer.from(existingMarkdown.content, 'base64').toString('utf-8');
        const { data, content } = parseFrontmatter(markdownContent);
        return res.json({
            slug,
            title: data.title || '',
            date: data.date || '',
            description: data.description || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            coverImage: data.coverImage || '',
            published: normalizePublished(data.published, true),
            body: content
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Hata: ${error.message}`);
    }
});

app.post('/publish', requireAuth, upload.single('coverImage'), async (req, res) => {
    try {
        const {
            title,
            description,
            date,
            tags,
            body,
            slug: providedSlug,
            published
        } = req.body;

        if (!title || !description || !date || !body) {
            return res.status(400).send('Zorunlu alanlar eksik.');
        }

        const safeSlug = providedSlug || slugify(title);
        const dateValue = new Date(date);
        const dateString = Number.isNaN(dateValue.getTime())
            ? new Date().toISOString().split('T')[0]
            : dateValue.toISOString().split('T')[0];

        const slug = providedSlug || `${dateString}-${safeSlug}`;
        const tagsArray = tags
            ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
            : [];

        let coverImageValue = '';
        const markdownPath = `content/academy/${slug}.md`;
        const existingMarkdown = await getRepoFile(markdownPath);
        let existingFrontmatter = {};
        if (existingMarkdown) {
            const content = Buffer.from(existingMarkdown.content, 'base64').toString('utf-8');
            existingFrontmatter = parseFrontmatter(content).data || {};
        }

        const finalPublished = normalizePublished(published, normalizePublished(existingFrontmatter.published, true));

        if (req.file) {
            const extension = path.extname(req.file.originalname) || '.jpg';
            coverImageValue = `/${`uploads/${slug}${extension}`}`;
        } else if (existingFrontmatter.coverImage) {
            coverImageValue = existingFrontmatter.coverImage;
        }

        const markdown = buildMarkdown({
            title,
            date: dateString,
            description,
            tags: tagsArray,
            coverImage: coverImageValue,
            published: finalPublished,
            body
        });

        const templatePath = new URL('./templates/academy-post.html', import.meta.url);
        const template = await fs.readFile(templatePath, 'utf-8');
        const html = template
            .replace(/{{slug}}/g, slug)
            .replace(/{{title}}/g, title)
            .replace(/{{description}}/g, description);

        const commitMessage = existingMarkdown ? `Update article: ${title}` : `Add new article: ${title}`;
        const htmlPath = `akademi/${slug}.html`;

        const existingHtml = await getRepoFile(htmlPath);
        const existingIndex = await getRepoFile('content/academy/index.json');

        let indexData = [];
        let indexSha = null;
        if (existingIndex) {
            indexSha = existingIndex.sha;
            const content = Buffer.from(existingIndex.content, 'base64').toString('utf-8');
            indexData = JSON.parse(content);
        }

        const indexEntry = {
            slug,
            title,
            date: dateString,
            description,
            coverImage: coverImageValue || '',
            tags: tagsArray,
            published: finalPublished
        };

        indexData = [indexEntry, ...indexData.filter((item) => item.slug !== slug)];
        indexData.sort((a, b) => new Date(b.date) - new Date(a.date));

        await createOrUpdateFile({
            filePath: markdownPath,
            content: markdown,
            message: commitMessage,
            sha: existingMarkdown?.sha
        });

        await createOrUpdateFile({
            filePath: htmlPath,
            content: html,
            message: commitMessage,
            sha: existingHtml?.sha
        });

        if (req.file) {
            const imagePath = coverImageValue.replace(/^\//, '');
            const existingImage = await getRepoFile(imagePath);
            await createOrUpdateFile({
                filePath: imagePath,
                content: req.file.buffer,
                message: commitMessage,
                sha: existingImage?.sha
            });
        }

        await createOrUpdateFile({
            filePath: 'content/academy/index.json',
            content: JSON.stringify(indexData, null, 2),
            message: commitMessage,
            sha: indexSha
        });

        return res.json({ ok: true, slug });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Hata: ${error.message}`);
    }
});

app.post('/unpublish', requireAuth, async (req, res) => {
    try {
        const { slug } = req.body;
        if (!slug) {
            return res.status(400).send('Slug gerekli.');
        }

        const markdownPath = `content/academy/${slug}.md`;
        const existingMarkdown = await getRepoFile(markdownPath);
        if (!existingMarkdown) {
            return res.status(404).send('Makale bulunamadı.');
        }

        const markdownContent = Buffer.from(existingMarkdown.content, 'base64').toString('utf-8');
        const { data, content } = parseFrontmatter(markdownContent);
        const updatedMarkdown = buildMarkdown({
            title: data.title || '',
            date: data.date || '',
            description: data.description || '',
            tags: Array.isArray(data.tags) ? data.tags : [],
            coverImage: data.coverImage || '',
            published: false,
            body: content || ''
        });

        const commitMessage = `Unpublish article: ${data.title || slug}`;
        await createOrUpdateFile({
            filePath: markdownPath,
            content: updatedMarkdown,
            message: commitMessage,
            sha: existingMarkdown.sha
        });

        const existingIndex = await getRepoFile('content/academy/index.json');
        if (existingIndex) {
            const indexSha = existingIndex.sha;
            const contentIndex = Buffer.from(existingIndex.content, 'base64').toString('utf-8');
            const indexData = JSON.parse(contentIndex).map((post) => ({
                ...post,
                published: normalizePublished(post.published, true)
            }));
            const updatedIndex = indexData.map((post) => (post.slug === slug
                ? { ...post, published: false }
                : post));
            await createOrUpdateFile({
                filePath: 'content/academy/index.json',
                content: JSON.stringify(updatedIndex, null, 2),
                message: commitMessage,
                sha: indexSha
            });
        }

        return res.json({ ok: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Hata: ${error.message}`);
    }
});

app.delete('/posts/:slug', requireAuth, async (req, res) => {
    try {
        const { slug } = req.params;
        const deleteCover = req.query.deleteCover === 'true';

        const markdownPath = `content/academy/${slug}.md`;
        const existingMarkdown = await getRepoFile(markdownPath);
        if (!existingMarkdown) {
            return res.status(404).send('Makale bulunamadı.');
        }

        const markdownContent = Buffer.from(existingMarkdown.content, 'base64').toString('utf-8');
        const { data } = parseFrontmatter(markdownContent);

        const commitMessage = `Delete article: ${data.title || slug}`;

        await deleteRepoFile({
            filePath: markdownPath,
            sha: existingMarkdown.sha,
            message: commitMessage
        });

        const htmlPath = `akademi/${slug}.html`;
        const existingHtml = await getRepoFile(htmlPath);
        if (existingHtml) {
            await deleteRepoFile({
                filePath: htmlPath,
                sha: existingHtml.sha,
                message: commitMessage
            });
        }

        if (deleteCover && data.coverImage) {
            const coverPath = data.coverImage.replace(/^\//, '');
            const existingCover = await getRepoFile(coverPath);
            if (existingCover) {
                await deleteRepoFile({
                    filePath: coverPath,
                    sha: existingCover.sha,
                    message: commitMessage
                });
            }
        }

        const existingIndex = await getRepoFile('content/academy/index.json');
        if (existingIndex) {
            const indexSha = existingIndex.sha;
            const contentIndex = Buffer.from(existingIndex.content, 'base64').toString('utf-8');
            const indexData = JSON.parse(contentIndex).filter((post) => post.slug !== slug);
            await createOrUpdateFile({
                filePath: 'content/academy/index.json',
                content: JSON.stringify(indexData, null, 2),
                message: commitMessage,
                sha: indexSha
            });
        }

        return res.json({ ok: true });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Hata: ${error.message}`);
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Academy publisher running on ${PORT}`);
});
