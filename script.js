// Preloader
window.addEventListener('load', () => {
    document.getElementById('preloader').style.display = 'none';
});

// Typing Effect
const textArray = ["Utkarsh Singh", "AI Enthusiast", "ML Engineer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeSpeed = 100;

function type() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        document.querySelector('.typing-text').textContent = currentText.substring(0, charIndex - CharIndex - 1);
        charIndex--;
    } else {
        document.querySelector('.typing-text').textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? typeSpeed / 2 : typeSpeed);
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
});

document.addEventListener('DOMContentLoaded', () => {
    type();
});
