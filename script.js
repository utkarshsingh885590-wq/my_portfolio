// --- Theme Handling Logic ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check localStorage for preferred theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
    // Basic appearance change - toggling data-theme attribute
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});


// --- Task 6: Form Validation Logic ---
(() => {
    'use strict'
  
    // Fetch the form we want to apply custom validation styles to
    const form = document.getElementById('contact-form')
  
    // Add event listener to handle form submission
    form.addEventListener('submit', event => {
        // Perform standard client-side validation check
        if (!form.checkValidity()) {
            event.preventDefault() // Stop submission if invalid
            event.stopPropagation()
        }
        
        // Let Bootstrap add styles (red borders etc.)
        form.classList.add('was-validated')
        
        // Success logic handler
        if (form.checkValidity()) {
            alert('Signal Sent! Utkarsh will analyze your request soon.');
            form.reset();
            form.classList.remove('was-validated');
        }

    }, false)
})()
});
