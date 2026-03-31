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

   const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

function toggleChat() {
    const chat = document.getElementById('aiChat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKey(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    if (!input.value.trim()) return;

    const userText = input.value;
    body.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    body.scrollTop = body.scrollHeight;

    status.innerText = "Thinking...";
    status.style.color = "#fbbf24";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: You are the personal AI of Utkarsh Singh. He is a 2nd-year AI/ML student at BP Mandal College, Madhepura. He created a Restaurant Success Prediction model with 89% accuracy using Python. He knows Machine Learning, Pandas, and Scikit-learn. Be helpful, very brief, and talk like a pro engineer. User asked: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;

        status.innerText = "Online";
        status.style.color = "#4ade80";
        body.innerHTML += `<div class="ai-msg">${aiText}</div>`;
        body.scrollTop = body.scrollHeight;

    } catch (error) {
        status.innerText = "Error";
        body.innerHTML += `<div class="ai-msg">System overload! Please try again later.</div>`;
        console.error(error);
    }
}
