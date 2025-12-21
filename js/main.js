// Feza Savaş Website - Main JavaScript

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log('Feza Savaş website loaded successfully!');

    // Smooth scroll için nav linklerine event listener ekle
    initSmoothScroll();

    // Mobile menu toggle (gelecekte eklenebilir)
    initMobileMenu();

    // Biyografi dil değiştirici
    initBioLanguageSwitcher();
});

// Smooth scroll fonksiyonu
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile menu için hazırlık (gelecekte genişletilebilir)
function initMobileMenu() {
    // Mobile menu butonu eklendiğinde burası aktif olacak
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Biyografi dil seçimi
function initBioLanguageSwitcher() {
    const switcher = document.querySelector('.bio-language-switcher');
    if (!switcher) {
        return;
    }

    const buttons = Array.from(switcher.querySelectorAll('.language-btn[data-lang]'));
    const blocks = Array.from(document.querySelectorAll('.bio-block[data-lang]'));

    if (!buttons.length || !blocks.length) {
        return;
    }

    const defaultButton = switcher.querySelector('.language-btn.is-active') || buttons[0];
    setActiveLanguage(defaultButton.dataset.lang);

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            setActiveLanguage(button.dataset.lang);
        });
    });

    function setActiveLanguage(lang) {
        buttons.forEach(button => {
            const isActive = button.dataset.lang === lang;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        blocks.forEach(block => {
            const isActive = block.dataset.lang === lang;
            block.classList.toggle('is-active', isActive);
            block.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        });
    }
}

// Form validasyonu (iletişim formu eklendiğinde kullanılabilir)
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Utility: Scroll to top butonu
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.display = 'none';

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Sayfa yüklendiğinde scroll to top butonunu oluştur
window.addEventListener('load', createScrollToTop);
