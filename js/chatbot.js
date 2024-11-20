document.addEventListener('DOMContentLoaded', function() {
    // Message sending functionality
    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.querySelector('.chat-input textarea');
    const sendButton = document.querySelector('.chat-input button');

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message !== '') {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message');
            messageElement.innerHTML = `
                <div class="chat-message-content">
                    <p>${message}</p>
                </div>
            `;
            chatBody.appendChild(messageElement);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }

    sendButton.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Language switcher functionality
    setupLanguageSwitcher();
});

function setupLanguageSwitcher() {
    const languageSelector = document.querySelector('.language-selector');
    const currentLang = languageSelector.querySelector('span');
    
    const dropdown = document.createElement('div');
    dropdown.className = 'language-dropdown';
    
    const languages = [
        { code: 'Eng', name: 'English (US)' },
        { code: 'Esp', name: 'Español' },
        { code: 'Por', name: 'Português' }
    ];
    
    languages.forEach(lang => {
        const option = document.createElement('div');
        option.className = 'language-option';
        option.textContent = lang.name;
        option.onclick = () => {
            currentLang.textContent = `${lang.code} (${lang.code === 'Eng' ? 'US' : ''})`;
            dropdown.classList.remove('active');
        };
        dropdown.appendChild(option);
    });
    
    languageSelector.appendChild(dropdown);
    
    languageSelector.onclick = (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    };
    
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
}