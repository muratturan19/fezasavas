# Feza Savaş Website

Feza Savaş'ın resmi kurumsal web sitesi. Modern, responsive ve kullanıcı dostu tasarımla hazırlanmıştır.

## 🚀 Özellikler

- ✅ Responsive (Mobil uyumlu) tasarım
- ✅ Modern ve temiz arayüz
- ✅ Hızlı sayfa yükleme
- ✅ SEO uyumlu yapı
- ✅ GitHub Pages ile ücretsiz hosting

## 📁 Proje Yapısı

```
fezasavas/
├── index.html              # Ana sayfa
├── css/
│   └── style.css          # Ana stil dosyası
├── js/
│   └── main.js            # JavaScript dosyası
├── images/
│   └── logo.png           # Logo ve görseller
├── pages/
│   ├── danismanlik.html   # Danışmanlık sayfası
│   ├── ticaret.html       # Ticaret sayfası
│   ├── delta-proje.html   # Delta Proje sayfası
│   ├── klinker.html       # Klinker sayfası
│   └── pet-sise.html      # PET Şişe sayfası
└── README.md              # Bu dosya
```

## 🌐 Sayfalar

1. **Ana Sayfa** - Genel bilgi ve hizmet kartları
2. **Danışmanlık** - Danışmanlık hizmetleri detayları
3. **Ticaret** - Ticari faaliyetler ve çözümler
4. **Delta Proje** - Proje yönetimi hizmetleri
5. **Klinker** - Klinker ürünleri ve satış
6. **PET Şişe** - PET şişe üretimi ve satışı

## 🛠️ Teknolojiler

- HTML5
- CSS3 (Responsive Grid & Flexbox)
- Vanilla JavaScript
- GitHub Pages

## 📦 Kurulum

### Yerel Geliştirme

1. Repoyu klonlayın:
```bash
git clone https://github.com/muratturan19/fezasavas.git
cd fezasavas
```

2. Bir yerel sunucu başlatın (örnek: Python ile):
```bash
# Python 3
python -m http.server 8000

# veya Node.js ile
npx serve
```

3. Tarayıcınızda açın: `http://localhost:8000`

### GitHub Pages ile Yayınlama

1. GitHub repository ayarlarına gidin
2. "Pages" sekmesine tıklayın
3. "Source" olarak ana branch'i seçin
4. "Save" butonuna tıklayın
5. Birkaç dakika içinde siteniz yayına alınacaktır

Site URL'i: `https://muratturan19.github.io/fezasavas/`

## 🎨 Özelleştirme

### Renk Şeması Değiştirme

`css/style.css` dosyasında ana renkleri değiştirebilirsiniz:

```css
/* Ana renkler */
--primary-color: #667eea;
--secondary-color: #764ba2;
--dark-color: #2c3e50;
--light-color: #ecf0f1;
```

### Logo Ekleme

`images/` klasörüne `logo.png` dosyanızı ekleyin. Önerilen boyut: 200x50 piksel.

### İçerik Güncelleme

Her sayfa için ilgili HTML dosyasını düzenleyin. Tüm sayfalar aynı yapıya sahiptir ve kolayca düzenlenebilir.

## 📰 Akademi (Git tabanlı CMS)

Bu repo statik kalır; makale yayınlama işlemi **/admin** paneli ve ayrı bir Render Web Service üzerinden yapılır. Yayınlama sırasında backend GitHub'a otomatik commit atar, Render yeniden build alır.

### 1) Akademi sayfaları

- Liste: `/akademi/` (kart grid + etiket filtresi)
- Detay: `/akademi/<slug>.html`
- İçerik klasörü: `content/academy/*.md`
- Index dosyası: `content/academy/index.json`
- Görseller: `uploads/`

### 2) Admin paneli

- URL: `/admin/`
- Giriş: tek kullanıcı (username + password)
- API adresi: Render backend URL'si

> Admin panel, yayınlama isteğini backend'e gönderir. Backend GitHub API ile commit atar.

### 3) Backend (Render Web Service)

Backend kodu `backend/` klasöründedir (Node.js + Express).

#### Render ayarları

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

#### Gerekli ortam değişkenleri

- `ADMIN_USER`: Admin kullanıcı adı
- `ADMIN_PASSWORD`: Admin şifre
- `ADMIN_ORIGIN`: Admin panel domaini (örn. `https://fezasavas.com`) veya `*`
- `GITHUB_TOKEN`: GitHub Personal Access Token (repo write)
- `GITHUB_REPO`: `owner/repo` formatında repo adı
- `GITHUB_BRANCH`: `main` (opsiyonel)

#### Backend endpointleri

- `POST /publish` (Basic Auth)
  - FormData alanları: `title`, `description`, `date`, `tags`, `body`, `coverImage`
- `GET /health`

### 4) GitHub token (PAT) oluşturma

1. GitHub → Settings → Developer settings → Personal access tokens
2. `repo` yazma izni verin
3. Token'ı Render `GITHUB_TOKEN` env olarak ekleyin

### 5) Admin panelini bağlama

`/admin` sayfasına gidin, kullanıcı bilgilerini ve Render backend URL'sini girin. Sonraki yayınlamalarda bilgiler tarayıcı oturumunda saklanır.

## 📝 Yapılacaklar

- [ ] İletişim formu ekleme
- [ ] Google Maps entegrasyonu
- [ ] Blog/Haberler bölümü
- [ ] Çoklu dil desteği (TR/EN)
- [ ] Galeri sayfası
- [ ] Referanslar bölümü

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje özel mülkiyettedir. Tüm hakları Feza Savaş'a aittir.

## 📧 İletişim

Sorularınız için: [info@fezasavas.com](mailto:info@fezasavas.com)

---

© 2024 Feza Savaş. Tüm hakları saklıdır.
