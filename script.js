// 1. Gemini AI Configuration
const GEMINI_KEY = "AIzaSyCNxRTF_fe2ygGboZLrGknOd30a61vTPrQ";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

// 2. Toggle Chat Window
function toggleChat() {
    const chat = document.getElementById('aiChat');
    if (chat.style.display === 'flex') {
        chat.style.display = 'none';
    } else {
        chat.style.display = 'flex';
    }
}

// 3. Send Message to AI
async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    const userText = input.value.trim();
    if (!userText) return;

    // Display User Message
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
                        text: `You are Utkarsh's AI assistant. 
                        Context: Utkarsh is a 2nd year B.Tech AI/ML student at BP Mandal College. 
                        He built a Restaurant Success Prediction model (89% accuracy). 
                        Explain clearly and use code blocks if needed. Question: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            
            // Format with Marked.js (Markdown to HTML)
            const aiFormatted = typeof marked !== 'undefined' ? marked.parse(aiRaw) : aiRaw;

            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
        } else {
            throw new Error("Invalid Response");
        }

    } catch (error) {
        console.error("AI Error:", error);
        body.innerHTML += `<div class="ai-msg">Sorry, I'm facing some connectivity issues.</div>`;
    } finally {
        status.innerText = "Online";
        body.scrollTop = body.scrollHeight;
    }
}

// 4. Skills Toggle Logic (Expand/Collapse)
function toggleSkill(id) {
    const detail = document.getElementById(id);
    if (detail) {
        detail.classList.toggle('active');
    }
}

// 5. Theme Toggle (Light/Dark Mode)
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeBtn.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// 6. Close chat on 'Escape' key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('aiChat').style.display = 'none';
    }
});
