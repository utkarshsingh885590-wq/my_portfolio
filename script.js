// Simple Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
});

// Form Submission Feedback
const form = document.querySelector('.simple-form');
form.addEventListener('submit', (e) => {
    // We let Formspree handle the submission, but we can add a simple alert
    setTimeout(() => {
        console.log("Form processing...");
    }, 500);
});
