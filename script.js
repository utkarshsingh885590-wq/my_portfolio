// 1. Gemini AI Integration
const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    if (!input.value.trim()) return;

    const userText = input.value;
    body.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    body.scrollTop = body.scrollHeight;

    status.innerText = "Processing...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are Utkarsh Singh's AI assistant. 
                        About Utkarsh: 2nd year B.Tech AI/ML student at BP Mandal College, Madhepura. 
                        Top Project: Restaurant Prediction model (89% accuracy). 
                        Expert in: Python, Pandas, ML. 
                        Tone: Professional, brief, and smart. Answer this: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        status.innerText = "Online";
        body.innerHTML += `<div class="ai-msg">${aiResponse}</div>`;
        body.scrollTop = body.scrollHeight;
    } catch (err) {
        status.innerText = "Offline";
        body.innerHTML += `<div class="ai-msg">I'm currently recalibrating my neural networks. Try again!</div>`;
    }
}

// 2. Navigation & UI Logic
function toggleChat() {
    const chat = document.getElementById('aiChat');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKey(e) {
    if (e.key === 'Enter') sendMessage();
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
