// Typing effect for the Hero section
const text = "AI & Machine Learning Enthusiast";
let i = 0;

function typing() {
    if (i < text.length) {
        document.querySelector('.typing-text').innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typing, 100);
    }
}

// Fade-in animation on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    typing();
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
