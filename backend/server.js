import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
});

const ADMIN_ORIGIN = process.env.ADMIN_ORIGIN || '*';
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', ADMIN_ORIGIN);
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
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

app.get('/health', (req, res) => {
    res.json({ ok: true });
});

app.post('/publish', requireAuth, upload.single('coverImage'), async (req, res) => {
    try {
        const { title, description, date, tags, body } = req.body;

        if (!title || !description || !date || !body) {
            return res.status(400).send('Zorunlu alanlar eksik.');
        }

        const safeSlug = slugify(title);
        const dateValue = new Date(date);
        const dateString = Number.isNaN(dateValue.getTime())
            ? new Date().toISOString().split('T')[0]
            : dateValue.toISOString().split('T')[0];

        const slug = `${dateString}-${safeSlug}`;
        const tagsArray = tags
            ? tags.split(',').map((tag) => tag.trim()).filter(Boolean)
            : [];

        let coverPath = '';
        if (req.file) {
            const extension = path.extname(req.file.originalname) || '.jpg';
            coverPath = `uploads/${slug}${extension}`;
        }

        const frontmatterLines = [
            '---',
            `title: "${title.replace(/"/g, '\\"')}"`,
            `date: "${dateString}"`,
            `description: "${description.replace(/"/g, '\\"')}"`
        ];

        if (coverPath) {
            frontmatterLines.push(`coverImage: "/${coverPath}"`);
        }

        if (tagsArray.length) {
            frontmatterLines.push('tags:');
            tagsArray.forEach((tag) => frontmatterLines.push(`  - "${tag.replace(/"/g, '\\"')}"`));
        }

        frontmatterLines.push('---');
        const markdown = `${frontmatterLines.join('\n')}\n${body.trim()}\n`;

        const templatePath = new URL('./templates/academy-post.html', import.meta.url);
        const template = await fs.readFile(templatePath, 'utf-8');
        const html = template
            .replace(/{{slug}}/g, slug)
            .replace(/{{title}}/g, title)
            .replace(/{{description}}/g, description);

        const commitMessage = `Add new article: ${title}`;

        const markdownPath = `content/academy/${slug}.md`;
        const htmlPath = `akademi/${slug}.html`;

        const existingMarkdown = await getRepoFile(markdownPath);
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
            coverImage: coverPath ? `/${coverPath}` : '',
            tags: tagsArray
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
            const existingImage = await getRepoFile(coverPath);
            await createOrUpdateFile({
                filePath: coverPath,
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Academy publisher running on ${PORT}`);
});
