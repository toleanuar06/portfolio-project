/**
 * script.js - Портфолио сайтының негізгі интерактивті функционалы
 * Ануар Төле
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Мобильді навигация мәзірін ашу/жабу
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // 2. Басты беттегі аватар суретін үлкейтіп көру
    const avatarBtn = document.getElementById('avatar-btn');
    const imageModal = document.getElementById('image-modal');

    if (avatarBtn && imageModal) {
        avatarBtn.addEventListener('click', () => {
            imageModal.style.display = 'flex';
        });

        imageModal.addEventListener('click', () => {
            imageModal.style.display = 'none';
        });
    }

    // 3. Активті навигация сілтемесін автоматты белгілеу
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
