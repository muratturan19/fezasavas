const loginForm = document.getElementById('login-form');
const publishForm = document.getElementById('publish-form');
const loginCard = document.getElementById('login-card');
const publishCard = document.getElementById('publish-card');
const statusEl = document.getElementById('publish-status');

const setStatus = (message, type) => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type);
};

const getSession = () => ({
    apiBase: sessionStorage.getItem('academyApiBase'),
    username: sessionStorage.getItem('academyUsername'),
    password: sessionStorage.getItem('academyPassword')
});

const showPublish = () => {
    loginCard.hidden = true;
    publishCard.hidden = false;
};

const showLogin = () => {
    loginCard.hidden = false;
    publishCard.hidden = true;
};

const applySession = () => {
    const { apiBase, username, password } = getSession();
    if (apiBase && username && password) {
        showPublish();
        return;
    }
    showLogin();
};

loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value.trim();
    const apiBase = document.getElementById('admin-api').value.trim();

    if (!username || !password || !apiBase) {
        return;
    }

    sessionStorage.setItem('academyUsername', username);
    sessionStorage.setItem('academyPassword', password);
    sessionStorage.setItem('academyApiBase', apiBase.replace(/\/$/, ''));

    showPublish();
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

    setStatus('Yayınlanıyor...', null);

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
        setStatus(`Başarılı! ${result.slug} yayına alındı.`, 'is-success');
        publishForm.reset();
    } catch (error) {
        setStatus(`Hata: ${error.message}`, 'is-error');
    }
});

const dateInput = publishForm?.querySelector('input[name="date"]');
if (dateInput && !dateInput.value) {
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];
}

applySession();
