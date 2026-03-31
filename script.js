// 1. Apni NEW API Key yahan dalo agar purani block ho gayi ho
const GEMINI_KEY = "AIzaSyB8ldutUVbE8e4xiZ4bp5DwkNMHAsEvsos"; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`;

async function sendMessage() {
    const input = document.getElementById('userInput');
    const body = document.getElementById('chatBody');
    const status = document.getElementById('aiStatus');
    
    const userText = input.value.trim();
    if (!userText) return;

    // User ka message screen par dikhao
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

        // Agar Google error bhej raha hai (404, 400, etc.)
        if (!response.ok) {
            console.error("Google API Error:", data);
            throw new Error(data.error ? data.error.message : "Invalid API Request");
        }

        // Check if response has content
        if (data.candidates && data.candidates[0].content) {
            const aiRaw = data.candidates[0].content.parts[0].text;
            // Marked.js use karke format karo
            const aiFormatted = typeof marked !== 'undefined' ? marked.parse(aiRaw) : aiRaw;
            body.innerHTML += `<div class="ai-msg">${aiFormatted}</div>`;
            status.innerText = "Online";
        } else {
            throw new Error("API responded but no content found.");
        }

    } catch (error) {
        console.error("Full Debug Error:", error);
        status.innerText = "Offline";
        body.innerHTML += `<div class="ai-msg" style="color: red;">Error: ${error.message}</div>`;
    } finally {
        body.scrollTop = body.scrollHeight;
    }
}

      
