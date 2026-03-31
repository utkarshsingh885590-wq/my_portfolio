/**
 * UTKARSH SINGH - PORTFOLIO SCRIPT
 * Features: Gemini AI Chatbot & Dark/Light Theme Toggle
 */

// --- 1. CONFIGURATION ---
// Yahan apni NAYI Restricted API Key dalo
const GEMINI_KEY = "AIzaSyBSROwkYwyG0Dzz8-WKSzjak60XYz-fRNA"; 
// Gemini 1.5 Flash ke liye v1beta URL sabse best hai
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

// --- 2. THEME TOGGLE LOGIC ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeBtn.querySelector('i');
        
        // Icon badalne ke liye
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark'); // Choice save karne ke liye
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Page load par purana theme check karo
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        if(themeBtn) themeBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});

// --- 3. AI CHATBOT LOGIC ---

// Chat window kholne/band karne ke liye
function toggleChat() {
    const chat = document.getElementById('aiChat');
    if (chat) {
        if (chat.style.display === 'flex') {
            chat.style.display = 'none';
        } else {
            chat.style.display = 'flex';
        }
    }
}

// Message bhejne ke liye
async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    const userText = input.value.trim();
    if (!userText) return;

    // 1. User ka message screen par dalo
    body.innerHTML += `<div class="user-msg">${userText}</div>`;
    input.value = "";
    body.scrollTop = body.scrollHeight;

    status.innerText = "Thinking...";

    try {
        // 2. Gemini API ko call karo
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Context: You are Utkarsh's AI assistant. He is a 2nd-year B.Tech AI/ML student at BP Mandal College. 
                        Answer the following professionally: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // Error handling agar API reject kare
        if (!response.ok) {
            throw new Error(data.error ? data.error.message : "API Error");
        }

        // 3. AI ka jawab dikhao
        if (data.candidates && data.candidates[0].content) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            
            // Marked.js (Markdown to HTML) use karo agar index.html mein library hai
            const aiFormatted = (typeof marked !== 'undefined') ? marked.parse(aiRaw) : aiRaw;

            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
            status.innerText = "Online";
        } else {
            throw new Error("No response from AI.");
        }

    } catch (error) {
        console.error("AI Error:", error);
        status.innerText = "Offline";
        body.innerHTML += `<div class="ai-msg" style="color:red">Error: ${error.message}</div>`;
    } finally {
        body.scrollTop = body.scrollHeight;
    }
}

// Enter key se message bhejna
const userInputField = document.getElementById('userInput');
if (userInputField) {
    userInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}
