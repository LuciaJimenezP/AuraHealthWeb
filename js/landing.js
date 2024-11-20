document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
    });
});


document.querySelector(".link-hero").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".link-about-us").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".sobre-nosotros").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".link-conocenos").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".conocenos").scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".link-contact").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".contact").scrollIntoView({ behavior: "smooth" });
});

// menu responsive
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});



// TESTIMONIAL RAIN

const testimonialsList = [
    {
        content: "Gracias a AuraHealth, ahora tengo un mejor control de mis citas médicas y medicamentos.",
        rating: 5,
        author: "Ana García",
        date: "12 nov, 2024",
        image: "ana-garcia.jpeg"
    },
    
    {
        content: "AuraHealth me ha ayudado a mantener mi salud bajo control. Los recordatorios personalizados son geniales y me aseguran de no olvidar mis chequeos médicos. ¡Altamente recomendada!",
        rating: 4,
        author: "Sarah Johnson",
        date: "18 nov, 2024",
        image: "sarah-johnson.jpeg"
    },
    {
        content: "La plataforma es súper intuitiva y útil para monitorear mi salud. Las recomendaciones personalizadas son un toque increíble. ¡Gracias, AuraHealth!",
        rating: 5,
        author: "Carlos Méndez",
        date: "18 nov, 2024",
        image: "carlos-mendez.jpeg"
    },
    {
        content: "Desde que uso AuraHealth, tengo más confianza en mantener hábitos saludables. La integración con recordatorios me parece excelente.",
        rating: 4,
        author: "Ana López",
        date: "18 nov, 2024",
        image: "ana-lopez.jpeg"
    },
    {
        content: "Me gusta cómo AuraHealth adapta las recomendaciones a mi estilo de vida. ¡Es una herramienta indispensable para cualquiera que valore su salud!",
        rating: 5,
        author: "Miguel Torres",
        date: "18 nov, 2024",
        image: "miguel-torres.jpeg"
    },
    {
        content: "Una aplicación increíble. Me ayuda a organizar mis citas médicas y a aprender más sobre cómo cuidar mi salud. ¡Muy recomendada!",
        rating: 5,
        author: "Laura Pérez",
        date: "18 nov, 2024",
        image: "laura-perez.jpeg"
    },
    {
        content: "AuraHealth es una herramienta única. Me ha enseñado a priorizar mi salud y a tomar medidas preventivas. Muy útil y fácil de usar.",
        rating: 4,
        author: "Andrés Rivera",
        date: "18 nov, 2024",
        image: "andres-rivera.jpeg"
    }

];

class TestimonialsRain {
    constructor() {
        this.container = document.getElementById('testimonialsContainer');
        this.containerWidth = this.container.offsetWidth - 300; // Restamos el ancho de la tarjeta
        this.activeCards = new Set();
        this.maxSimultaneousCards = 3;
    }

    createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        // Generar estrellas basado en el rating
        const stars = Array(5).fill('★').map((star, index) => 
            `<span class="star" style="color: ${index < testimonial.rating ? '#ffd700' : '#ddd'}">${star}</span>`
        ).join('');

        card.innerHTML = `
            <div class="testimonial-content">
                <p>${testimonial.content}</p>
                <div class="testimonial-rating">
                    ${stars}
                </div>
            </div>
            <div class="testimonial-author">
                <img src="img/${testimonial.image}" alt="${testimonial.author}">
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.date}</p>
                </div>
            </div>
        `;

        return card;
    }

    startRaining() {
        setInterval(() => {
            if (this.activeCards.size < this.maxSimultaneousCards) {
                this.dropTestimonial();
            }
        }, 2000);
    }

    dropTestimonial() {
        // Seleccionar un testimonio aleatorio
        const testimonial = testimonialsList[Math.floor(Math.random() * testimonialsList.length)];
        const card = this.createTestimonialCard(testimonial);
        
        // Posición horizontal aleatoria
        const xPos = Math.random() * this.containerWidth;
        card.style.left = `${xPos}px`;
        
        this.container.appendChild(card);
        this.activeCards.add(card);

        // Agregar la clase de animación
        setTimeout(() => {
            card.classList.add('falling');
        }, 100);

        // Remover la tarjeta cuando termine la animación
        card.addEventListener('animationend', () => {
            this.container.removeChild(card);
            this.activeCards.delete(card);
        });
    }

    // Método para actualizar el ancho del contenedor si la ventana cambia de tamaño
    updateContainerWidth() {
        this.containerWidth = this.container.offsetWidth - 300;
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const rain = new TestimonialsRain();
    rain.startRaining();

    // Actualizar el ancho del contenedor cuando la ventana cambie de tamaño
    window.addEventListener('resize', () => {
        rain.updateContainerWidth();
    });
});