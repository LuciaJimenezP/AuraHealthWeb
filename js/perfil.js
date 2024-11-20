document.addEventListener('DOMContentLoaded', function() {
    // Language switcher functionality
    setupLanguageSwitcher();
    // Edit functionality
    setupEditFunctionality();
    // Antecedentes functionality
    setupAntecedentesHandler();
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

function setupEditFunctionality() {
    const historialFamiliar = document.querySelector('.texto-historial');
    const informacionPersonal = document.querySelector('.informacion-personal table');
    
    // Estado de edición para cada sección
    const editState = {
        historial: false,
        personal: false
    };

    // Agregar event listeners a los iconos de edición
    document.querySelectorAll('.edit-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const section = this.dataset.section;
            toggleEditMode(section);
        });
    });

    function toggleEditMode(section) {
        editState[section] = !editState[section];
        
        if (editState[section]) {
            if (section === 'historial') {
                enableHistorialEditing();
            } else if (section === 'personal') {
                enablePersonalEditing();
            }
        } else {
            if (section === 'historial') {
                disableHistorialEditing();
            } else if (section === 'personal') {
                disablePersonalEditing();
            }
        }
    }

    function enablePersonalEditing() {
        const rows = informacionPersonal.querySelectorAll('tr');
        rows.forEach(row => {
            const td = row.querySelector('td');
            if (td) {
                const text = td.textContent.trim();
                td.innerHTML = `<input type="text" value="${text}" class="editable-input">`;
            }
        });
    }

    function disablePersonalEditing() {
        const personalInputs = informacionPersonal.querySelectorAll('input');
        personalInputs.forEach(input => {
            const td = input.parentElement;
            td.textContent = input.value;
        });
    }

 
}

function setupAntecedentesHandler() {
    const addAntecedenteBtn = document.querySelector('.add-new button');
    const antecedentesContainer = document.querySelector('.antecedents');

    addAntecedenteBtn?.addEventListener('click', showAntecedenteForm);

    function showAntecedenteForm() {
        const form = document.createElement('div');
        form.className = 'antecedente-form';
        form.innerHTML = `
            <div class="form-overlay"></div>
            <div class="form-content">
                <h3>Agregar Antecedente</h3>
                <input type="text" placeholder="Tipo de antecedente" id="antecedente-tipo">
                <input type="text" placeholder="Valor" id="antecedente-valor">
                <div class="form-buttons">
                    <button class="cancel-btn">Cancelar</button>
                    <button class="submit-btn">Agregar</button>
                </div>
            </div>
        `;

        document.body.appendChild(form);

        form.querySelector('.cancel-btn').addEventListener('click', () => form.remove());
        form.querySelector('.submit-btn').addEventListener('click', () => {
            const tipo = document.getElementById('antecedente-tipo').value;
            const valor = document.getElementById('antecedente-valor').value;
            
            if (tipo && valor) {
                addAntecedente(tipo, valor);
                form.remove();
            }
        });
    }

    function addAntecedente(tipo, valor) {
        const newAntecedente = document.createElement('div');
        newAntecedente.className = 'blood-type';
        newAntecedente.innerHTML = `
            <div class="icon">
                <img src="imgRHP/i_san.png" alt="Icono">
            </div>
            <div class="title">${tipo}</div>
            <div class="value">${valor}</div>
        `;

        antecedentesContainer.insertBefore(newAntecedente, addAntecedenteBtn.parentElement);
    }
}