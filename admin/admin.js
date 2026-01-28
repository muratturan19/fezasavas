const loginForm = document.getElementById('login-form');
const publishForm = document.getElementById('publish-form');
const loginCard = document.getElementById('login-card');
const adminContent = document.getElementById('admin-content');
const loginStatusEl = document.getElementById('login-status');
const statusEl = document.getElementById('publish-status');
const postsStatusEl = document.getElementById('posts-status');
const postsTableBody = document.getElementById('posts-table-body');
const publishTitle = document.getElementById('publish-title');
const publishSubmit = document.getElementById('publish-submit');
const cancelEditButton = document.getElementById('cancel-edit');
const slugInput = document.getElementById('admin-slug');
const publishedInput = document.getElementById('admin-published');
const coverNote = document.getElementById('cover-note');
const tabButtons = document.querySelectorAll('[data-admin-tab]');
const tabPanels = document.querySelectorAll('[data-admin-panel]');

const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type);
};

const setLoginStatus = (message, type) => {
    if (!loginStatusEl) return;
    loginStatusEl.textContent = message;
    loginStatusEl.classList.remove('is-success', 'is-error');
    if (type) loginStatusEl.classList.add(type);
};

const setPostsStatus = (message, type) => {
    if (!postsStatusEl) return;
    postsStatusEl.textContent = message;
    postsStatusEl.classList.remove('is-success', 'is-error');
    if (type) postsStatusEl.classList.add(type);
};

const getSession = () => ({
    apiBase: sessionStorage.getItem('academyApiBase'),
    username: sessionStorage.getItem('academyUsername'),
    password: sessionStorage.getItem('academyPassword')
});

const showPublish = () => {
    loginCard.hidden = true;
    adminContent.hidden = false;
};

const showLogin = () => {
    loginCard.hidden = false;
    adminContent.hidden = true;
};

const switchTab = (tab) => {
    tabButtons.forEach((button) => {
        const isActive = button.dataset.adminTab === tab;
        button.classList.toggle('is-active', isActive);
    });
    tabPanels.forEach((panel) => {
        panel.hidden = panel.dataset.adminPanel !== tab;
    });
};

const applySession = () => {
    const { apiBase, username, password } = getSession();
    if (apiBase && username && password) {
        showPublish();
        switchTab('publish');
        loadPosts();
        return;
    }
    showLogin();
};

const authHeaders = () => {
    const { username, password } = getSession();
    return {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
    };
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        return dateString;
    }
    return date.toLocaleDateString('tr-TR');
};

const normalizeApiBase = (input) => {
    const trimmed = input.trim();
    if (!trimmed) return null;
    const hasProtocol = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed);
    let urlString = trimmed;
    if (!hasProtocol) {
        const isLocal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?(\/|$)/.test(trimmed);
        urlString = `${isLocal ? 'http' : 'https'}://${trimmed}`;
    }
    try {
        const url = new URL(urlString);
        return `${url.origin}${url.pathname}`.replace(/\/$/, '');
    } catch (error) {
        return null;
    }
};

const resetPublishForm = () => {
    publishForm.reset();
    slugInput.value = '';
    publishedInput.value = 'true';
    publishTitle.textContent = 'Yeni Akademi Makalesi';
    publishSubmit.textContent = 'Yayınla';
    cancelEditButton.hidden = true;
    coverNote.hidden = true;
    setStatus('', null);
};

const fillPublishForm = (post) => {
    publishForm.querySelector('input[name="title"]').value = post.title || '';
    publishForm.querySelector('input[name="date"]').value = post.date || '';
    publishForm.querySelector('textarea[name="description"]').value = post.description || '';
    publishForm.querySelector('input[name="tags"]').value = (post.tags || []).join(', ');
    publishForm.querySelector('textarea[name="body"]').value = post.body || '';
    slugInput.value = post.slug || '';
    publishedInput.value = post.published ? 'true' : 'false';
    publishTitle.textContent = 'Makaleyi Düzenle';
    publishSubmit.textContent = 'Kaydet';
    cancelEditButton.hidden = false;
    coverNote.hidden = !(post.coverImage);
    switchTab('publish');
};

const loadPosts = async () => {
    const { apiBase } = getSession();
    if (!apiBase) return;

    setPostsStatus('Makaleler yükleniyor...', null);
    try {
        const response = await fetch(`${apiBase}/posts`, {
            headers: authHeaders()
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Liste alınamadı.');
        }

        const posts = await response.json();
        renderPosts(posts);
        setPostsStatus(posts.length ? '' : 'Henüz makale bulunmuyor.', null);
    } catch (error) {
        setPostsStatus(`Hata: ${error.message}`, 'is-error');
    }
};

const renderPosts = (posts) => {
    if (!postsTableBody) return;
    postsTableBody.innerHTML = '';

    posts.forEach((post) => {
        const row = document.createElement('tr');
        const tags = (post.tags || []).join(', ');
        const statusLabel = post.published ? 'Yayında' : 'Yayında değil';

        row.innerHTML = `
            <td>
                <strong>${post.title || post.slug}</strong>
                <div class="admin-muted">${post.slug}</div>
            </td>
            <td>${formatDate(post.date)}</td>
            <td>${tags || '-'}</td>
            <td><span class="admin-badge ${post.published ? 'is-live' : 'is-draft'}">${statusLabel}</span></td>
            <td class="admin-actions">
                <button type="button" class="secondary" data-action="edit">Düzenle</button>
                <button type="button" class="secondary" data-action="unpublish"${post.published ? '' : ' disabled'}>Yayından Kaldır</button>
                <button type="button" class="danger" data-action="delete">Sil</button>
            </td>
        `;

        row.querySelector('[data-action="edit"]').addEventListener('click', () => handleEdit(post.slug));
        row.querySelector('[data-action="unpublish"]').addEventListener('click', () => handleUnpublish(post.slug));
        row.querySelector('[data-action="delete"]').addEventListener('click', () => handleDelete(post.slug));

        postsTableBody.appendChild(row);
    });
};

const handleEdit = async (slug) => {
    const { apiBase } = getSession();
    setStatus('Makale yükleniyor...', null);
    try {
        const response = await fetch(`${apiBase}/posts/${slug}`, {
            headers: authHeaders()
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Makale yüklenemedi.');
        }
        const post = await response.json();
        fillPublishForm(post);
        setStatus('Makale düzenleme modunda.', 'is-success');
    } catch (error) {
        setStatus(`Hata: ${error.message}`, 'is-error');
    }
};

const handleUnpublish = async (slug) => {
    const { apiBase } = getSession();
    if (!confirm('Bu makaleyi yayından kaldırmak istediğinize emin misiniz?')) return;

    setPostsStatus('Yayından kaldırılıyor...', null);
    try {
        const response = await fetch(`${apiBase}/unpublish`, {
            method: 'POST',
            headers: {
                ...authHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ slug })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'İşlem başarısız.');
        }
        await loadPosts();
        setPostsStatus('Makale yayından kaldırıldı.', 'is-success');
    } catch (error) {
        setPostsStatus(`Hata: ${error.message}`, 'is-error');
    }
};

const handleDelete = async (slug) => {
    const { apiBase } = getSession();
    if (!confirm('Bu makaleyi silmek istediğinize emin misiniz?')) return;
    const deleteCover = confirm('Kapak görselini de silmek ister misiniz?');

    setPostsStatus('Makale siliniyor...', null);
    try {
        const response = await fetch(`${apiBase}/posts/${slug}?deleteCover=${deleteCover}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Silme başarısız.');
        }
        await loadPosts();
        setPostsStatus('Makale silindi.', 'is-success');
        if (slugInput.value === slug) {
            resetPublishForm();
        }
    } catch (error) {
        setPostsStatus(`Hata: ${error.message}`, 'is-error');
    }
};

loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();
    const apiBase = document.getElementById('admin-api').value.trim();

    if (!username || !password || !apiBase) {
        setLoginStatus('Lütfen kullanıcı adı, şifre ve API adresini girin.', 'is-error');
        return;
    }

    const normalizedApiBase = normalizeApiBase(apiBase);
    if (!normalizedApiBase) {
        setLoginStatus('Geçerli bir API adresi girin (ör. https://api.domain.com).', 'is-error');
        return;
    }

    sessionStorage.setItem('academyUsername', username);
    sessionStorage.setItem('academyPassword', password);
    sessionStorage.setItem('academyApiBase', normalizedApiBase);
    setLoginStatus('', null);

    showPublish();
    switchTab('publish');
    loadPosts();
});

publishForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { apiBase, username, password } = getSession();
    if (!apiBase || !username || !password) {
        setStatus('Önce giriş yapın.', 'is-error');
        showLogin();
        return;
    }

    const formData = new FormData(publishForm);

    setStatus(slugInput.value ? 'Kaydediliyor...' : 'Yayınlanıyor...', null);

    try {
        const response = await fetch(`${apiBase}/publish`, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Yayınlama başarısız.');
        }

        const result = await response.json();
        setStatus(`Başarılı! ${result.slug} kaydedildi.`, 'is-success');
        resetPublishForm();
        await loadPosts();
    } catch (error) {
        setStatus(`Hata: ${error.message}`, 'is-error');
    }
});

tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
        switchTab(button.dataset.adminTab);
        if (button.dataset.adminTab === 'posts') {
            loadPosts();
        }
    });
});

cancelEditButton?.addEventListener('click', () => {
    resetPublishForm();
});

const dateInput = publishForm?.querySelector('input[name="date"]');
if (dateInput && !dateInput.value) {
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];
}

applySession();
