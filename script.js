// Typing effect
const textArray = ["Machine Learning", "Data Preprocessing", "Python"];
const typingTextElement = document.querySelector('.typing-text');
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    if (isDeleting) {
        typingTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = 100;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // Small pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}

// Fade-in animation on scroll using Intersection Observer
const observerOptions = { root: null, threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Theme Toggle logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if(body.style.getPropertyValue('--bg') === '#ffffff'){
        body.style.removeProperty('--bg');
        themeToggle.innerHTML = '<ion-icon name="moon-outline"></ion-icon>';
    } else {
        body.style.setProperty('--bg', '#ffffff');
        themeToggle.innerHTML = '<ion-icon name="sunny-outline"></ion-icon>';
    }
});

// Contact Form submission (Success notification)
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert('Your message was sent successfully! Utkarsh will get back to you soon.');
            form.reset();
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    document.querySelectorAll('section, .project-card, .skill-tag').forEach(el => {
        el.classList.add('hidden'); // Initially hide
        observer.observe(el);
    });
});