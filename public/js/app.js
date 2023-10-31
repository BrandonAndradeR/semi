
const openChatBtn = document.getElementById('open-chat');
const closeChatBtn = document.getElementById('close-chat'); 
const chatWindowEl = document.getElementById('chat-window');
const chatMessagesEl = document.getElementById('chat-messages');
const chatInputEl = document.getElementById('chat-input');

const OPENAI_API_KEY = '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'; // Reemplaza esto con tu clave de API de OpenAI

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

async function generateBardResponse(prompt) {
    const response = await fetch('https://api.openai.com/v1/engines/bard/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 3000 // Número máximo de tokens para la respuesta generada por Bard
        })
    });

    const data = await response.json();
    return data.choices[0].text.trim();
    
}

function createMessageBubble(message, isSent) {
    const bubble = document.createElement('div');
    bubble.className = isSent ? 'sent-bubble' : 'received-bubble';
    bubble.textContent = message;
    return bubble;
}

async function addMessage(message, isSent) {
    const bubble = createMessageBubble(message, isSent);
    const p = document.createElement('p');
    const currentTime = getCurrentTime();
    p.textContent = `[${currentTime}]`;
    p.appendChild(bubble);
    chatMessagesEl.appendChild(p);
}

openChatBtn.addEventListener('click', () => {
    chatWindowEl.style.display = 'block';
});

closeChatBtn.addEventListener('click', () => {
    chatWindowEl.style.display = 'none';
});

chatInputEl.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
        const userMessage = chatInputEl.value.trim();
        if (userMessage) {
            await addMessage(userMessage, true); // Agrega el mensaje del usuario al chat
            chatInputEl.value = '';
        }
    }
});