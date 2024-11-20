document.addEventListener('DOMContentLoaded', function() {
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