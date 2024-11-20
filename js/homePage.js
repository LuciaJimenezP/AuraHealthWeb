// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    // Language switcher
    const languageSelector = document.querySelector('.language-selector');
    const currentLang = languageSelector.querySelector('span');
    
    // Create and append dropdown
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

    // Fetch and display upcoming reminder
    fetchUpcomingReminder();
    
    // Generate more news items
    generateMoreNews();
});

// Function to fetch upcoming reminder
async function fetchUpcomingReminder() {
    try {
        const response = await fetch('/api/reminders/next');
        const reminder = await response.json();
        
        // For demo purposes, we'll create a static reminder
        const reminderHTML = `
            <li>
                <strong>${reminder?.title || 'Chequeo médico'}</strong>
                <ul>
                    <li><strong>Fecha:</strong> ${reminder?.date || '12 de Septiembre'}</li>
                    <li><strong>Hora:</strong> ${reminder?.time || '5:00 pm'}</li>
                </ul>
            </li>
        `;
        
        document.querySelector('.recordatorios ul').innerHTML = reminderHTML;
    } catch (error) {
        console.log('Error fetching reminder:', error);
    }
}

// Function to generate more news items
function generateMoreNews() {
    const newsContainer = document.querySelector('.noticias');
    const newsTemplates = [
        {
            img: 'imgRHP/noticia2.png',
            title: 'Nuevos avances en tratamientos contra el cáncer',
            background: '#E4F5E7'
        },
        {
            img: 'imgRHP/noticia3.png',
            title: 'Beneficios de la medicina preventiva',
            background: '#FCE8E6'
        },
        {
            img: 'imgRHP/noticia4.jpg',
            title: 'One health',
            background: '#FFF7DB'
        }
    ];
    
    // Add more news items
    newsTemplates.forEach(news => {
        const newsItem = document.createElement('div');
        newsItem.className = 'noticia';
        newsItem.style.background = news.background;
        
        newsItem.innerHTML = `
            <img src="${news.img}" alt="Noticia">
            <div class="noticia-content">
                <p><strong>${news.title}</strong></p>
            </div>
        `;
        
        newsContainer.appendChild(newsItem);
    });
    setupResponsiveMenu();
}
