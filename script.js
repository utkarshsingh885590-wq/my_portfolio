// --- 1. CONFIGURATION ---
const GEMINI_KEY = "AIzaSyBSROwkYwyG0Dzz8-WKSzjak60XYz-fRNA"; 

// Humne yahan 'gemini-1.5-flash-latest' use kiya hai jo v1beta par 100% chalta hai
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`;

// --- 2. THEME TOGGLE ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.onclick = () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        }
    };
}

// --- 3. CHAT WINDOW TOGGLE ---
function toggleChat() {
    const chat = document.getElementById('aiChat');
    if (chat) {
        chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
    }
}

// --- 4. SEND MESSAGE TO AI ---
async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    const userText = input.value.trim();
    if (!userText) return;

    body.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    body.scrollTop = body.scrollHeight;

    status.innerText = "Connecting...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userText }] }]
            })
        });

        const data = await response.json();

        // Agar phir bhi error aaye, toh error message check karein
        if (!response.ok) {
            console.error("DEBUG DATA:", data);
            throw new Error(data.error ? data.error.message : "Model name issue");
        }

        if (data.candidates && data.candidates[0].content) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            const aiFormatted = (typeof marked !== 'undefined') ? marked.parse(aiRaw) : aiRaw;
            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
            status.innerText = "Online";
        }

    } catch (error) {
        console.error("AI Error:", error);
        status.innerText = "Offline";
        // User ko friendly error dikhao
        body.innerHTML += `<div class="ai-msg" style="color:red">Error: ${error.message}</div>`;
    } finally {
        body.scrollTop = body.scrollHeight;
    }
}

// Handle Enter Key
const inputField = document.getElementById('userInput');
if (inputField) {
    inputField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });
}
