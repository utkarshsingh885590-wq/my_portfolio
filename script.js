// --- 1. CONFIGURATION ---
const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

// --- 2. THEME TOGGLE (Fixed) ---
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        console.log("Theme button clicked!"); // Debugging ke liye
        document.body.classList.toggle('dark-theme');
        const icon = themeBtn.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// --- 3. CHAT WINDOW TOGGLE ---
function toggleChat() {
    const chat = document.getElementById('aiChat');
    if (chat) {
        chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
    }
}

// --- 4. SEND MESSAGE TO AI (Fixed 404 & Response) ---
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
                contents: [{ parts: [{ text: userText }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error ? data.error.message : "API Error");
        }

        if (data.candidates && data.candidates[0].content) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            // Markdown formatting
            const aiFormatted = (typeof marked !== 'undefined') ? marked.parse(aiRaw) : aiRaw;
            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
            status.innerText = "Online";
        }

    } catch (error) {
        console.error("Detailed Error:", error);
        status.innerText = "Offline";
        body.innerHTML += `<div class="ai-msg" style="color:red">Error: ${error.message}</div>`;
    } finally {
        body.scrollTop = body.scrollHeight;
    }
}

// Enter Key Support
function handleKey(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
