const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

function toggleChat() {
    const chat = document.getElementById('aiChat');
    if (chat.style.display === 'flex') {
        chat.style.display = 'none';
    } else {
        chat.style.display = 'flex';
    }
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    const userText = input.value.trim();
    if (!userText) return;

    // User message display
    body.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    body.scrollTop = body.scrollHeight;

    status.innerText = "Thinking...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a helpful AI assistant for Utkarsh Singh's portfolio. 
                        Utkarsh is a 2nd year B.Tech AI/ML student at BP Mandal College. 
                        He built a Restaurant Prediction model. Respond professionally.
                        User Question: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            
            // Markdown to HTML conversion using marked.js
            const aiFormatted = marked.parse(aiRaw);

            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
        } else {
            throw new Error("Invalid API Key or Limit reached.");
        }

    } catch (error) {
        console.error("AI Error:", error);
        body.innerHTML += `<div class="ai-msg">Sorry, I'm having trouble connecting right now.</div>`;
    } finally {
        status.innerText = "Online";
        body.scrollTop = body.scrollHeight;
    }
}

// Baki theme toggle logic
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeBtn.querySelector('i');
    icon.classList.toggle('fa-sun');
    icon.classList.toggle('fa-moon');
});
