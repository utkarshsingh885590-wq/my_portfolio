// 1. Apni NEW API Key yahan dalo agar purani block ho gayi ho
const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

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
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: userText
                    }]
                }]
            })
        });

        // Agar URL galat hoga toh yahan 404 pakda jayega
        if (!response.ok) {
            const err = await response.json();
            console.error("Server Error:", err);
            throw new Error(`API Error ${response.status}: ${err.error.message}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            const aiFormatted = typeof marked !== 'undefined' ? marked.parse(aiRaw) : aiRaw;

            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
            status.innerText = "Online";
        }

    } catch (error) {
        console.error("AI Logic Error:", error);
        status.innerText = "Offline";
        body.innerHTML += `<div class="ai-msg" style="color:red">Error: ${error.message}. Please check URL or API Key.</div>`;
    } finally {
        body.scrollTop = body.scrollHeight;
    }
}
