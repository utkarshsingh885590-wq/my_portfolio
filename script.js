// 1. Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

themeBtn.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
    }
});

// 2. Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3. Form Submission Feedback (Optional)
const form = document.querySelector('.contact-form');
form.addEventListener('submit', () => {
    alert("Message sent successfully! Utkarsh will get back to you.");
});
function toggleChat() {
    const chat = document.getElementById('aiChat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    
    if (input.value.trim() === "") return;

    // User Message
    body.innerHTML += `<div class="user-msg">${input.value}</div>`;
    
    const userText = input.value.toLowerCase();
    input.value = "";

    // AI Logic (Simple NLP)
    setTimeout(() => {
        let response = "I'm still learning! But I know Utkarsh is a great AI Engineer.";
        
        if (userText.includes("project") || userText.includes("restaurant")) {
            response = "Utkarsh built a Restaurant Prediction model with 89% accuracy using Random Forest!";
        } else if (userText.includes("skill") || userText.includes("tech")) {
            response = "He is an expert in Python, Scikit-Learn, and Data Science.";
        } else if (userText.includes("college")) {
            response = "He studies at B.P. Mandal College of Engineering, Madhepura.";
        } else if (userText.includes("hi") || userText.includes("hello")) {
            response = "Hello! How can I help you explore Utkarsh's work today?";
        }

        body.innerHTML += `<div class="ai-msg">${response}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);
}
