// ========================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ========================================

// Idioma actual
let idiomaActual = 'es';

// Función para cambiar el idioma
function cambiarIdioma(idioma) {
    idiomaActual = idioma;
    
    // Actualizar botones de idioma
    const botones = document.querySelectorAll('.lang-btn');
    botones.forEach(btn => {
        if (btn.getAttribute('data-lang') === idioma) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Actualizar todos los elementos con atributos de idioma
    const elementosTraducibles = document.querySelectorAll('[data-es][data-en]');
    elementosTraducibles.forEach(elemento => {
        const textoEs = elemento.getAttribute('data-es');
        const textoEn = elemento.getAttribute('data-en');
        
        if (idioma === 'es') {
            elemento.textContent = textoEs;
        } else {
            elemento.textContent = textoEn;
        }
    });
    
    // Guardar preferencia en localStorage
    localStorage.setItem('idioma_preferido', idioma);
    
    // Animación suave al cambiar
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

// Observador de intersección para animaciones al hacer scroll
const observarElementos = () => {
    const opciones = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, opciones);
    
    // Observar las tarjetas de proyectos
    const tarjetas = document.querySelectorAll('.project-card');
    tarjetas.forEach(tarjeta => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(30px)';
        tarjeta.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(tarjeta);
    });
};

// ========================================
// SMOOTH SCROLL
// ========================================

// Desplazamiento suave para los enlaces internos
const configurarScrollSuave = () => {
    const enlaces = document.querySelectorAll('a[href^="#"]');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const destino = document.querySelector(enlace.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// ========================================
// PARTICLE EFFECT (OPTIONAL)
// ========================================

// Crear efecto de partículas sutiles en el hero
const crearParticulasHero = () => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    // Crear 20 partículas
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula');
        
        // Posición aleatoria
        particula.style.left = Math.random() * 100 + '%';
        particula.style.top = Math.random() * 100 + '%';
        
        // Tamaño aleatorio
        const tamano = Math.random() * 4 + 2;
        particula.style.width = tamano + 'px';
        particula.style.height = tamano + 'px';
        
        // Duración de animación aleatoria
        particula.style.animationDuration = (Math.random() * 3 + 2) + 's';
        particula.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particula);
    }
};

// Estilos CSS para las partículas (se inyectan dinámicamente)
const inyectarEstilosParticulas = () => {
    const style = document.createElement('style');
    style.textContent = `
        .particula {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: flotar 5s ease-in-out infinite;
        }
        
        @keyframes flotar {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            90% {
                opacity: 0.5;
            }
            50% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.8;
            }
        }
    `;
    document.head.appendChild(style);
};

// ========================================
// PROJECT LINK TRACKING
// ========================================

// Rastrear clics en los proyectos (para analytics futuro)
const rastrearClicsProyectos = () => {
    const enlacesProyectos = document.querySelectorAll('.project-link');
    enlacesProyectos.forEach((enlace, index) => {
        enlace.addEventListener('click', (e) => {
            const nombreProyecto = enlace.closest('.project-card').querySelector('h3').textContent;
            console.log(`Proyecto clickeado: ${nombreProyecto}`);
            
            // Aquí podrías enviar datos a Google Analytics, por ejemplo:
            // gtag('event', 'click', { 'event_category': 'Proyecto', 'event_label': nombreProyecto });
        });
    });
};

// ========================================
// LOADING ANIMATION
// ========================================

// Animación de carga inicial
const animacionCargaInicial = () => {
    // Fade in suave del contenido
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
};

// ========================================
// EASTER EGG
// ========================================

// Pequeño easter egg: Konami code
let konamiIndex = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

const verificarKonamiCode = (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activarEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
};

const activarEasterEgg = () => {
    // Efecto arcoíris en el título
    const titulo = document.querySelector('.main-title');
    if (titulo) {
        titulo.style.animation = 'rainbow 2s linear infinite';
        
        // Crear keyframes para efecto arcoíris
        if (!document.querySelector('#rainbow-keyframes')) {
            const style = document.createElement('style');
            style.id = 'rainbow-keyframes';
            style.textContent = `
                @keyframes rainbow {
                    0% { color: #FF0000; }
                    16% { color: #FF7F00; }
                    33% { color: #FFFF00; }
                    50% { color: #00FF00; }
                    66% { color: #0000FF; }
                    83% { color: #8B00FF; }
                    100% { color: #FF0000; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Mensaje de felicitación
        setTimeout(() => {
            alert('🎉 ¡Encontraste el Easter Egg! ¡Los estudiantes de 11° te felicitan!');
            titulo.style.animation = '';
        }, 5000);
    }
};

// ========================================
// INICIALIZACIÓN
// ========================================

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar idioma guardado
    const idiomaGuardado = localStorage.getItem('idioma_preferido') || 'es';
    cambiarIdioma(idiomaGuardado);
    
    // Inicializar funcionalidades
    animacionCargaInicial();
    observarElementos();
    configurarScrollSuave();
    inyectarEstilosParticulas();
    crearParticulasHero();
    rastrearClicsProyectos();
    
    // Easter egg
    document.addEventListener('keydown', verificarKonamiCode);
    
    console.log('🎓 Seminario de Matemáticas y Programación - Grado 11');
    console.log('✨ Página cargada exitosamente');
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Lazy loading para imágenes (si decides agregar más)
const configurarLazyLoading = () => {
    const imagenes = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    imagenes.forEach(img => imageObserver.observe(img));
};

// Detectar si el usuario prefiere movimiento reducido
const respetarPreferenciasMovimiento = () => {
    const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefiereMenosMovimiento) {
        // Desactivar animaciones complejas
        document.body.style.setProperty('--transition-fast', '0s');
        document.body.style.setProperty('--transition-normal', '0s');
        document.body.style.setProperty('--transition-slow', '0s');
    }
};

// Ejecutar optimizaciones
respetarPreferenciasMovimiento();

// ========================================
// EXPORT FUNCTIONS (para uso en consola)
// ========================================

// Hacer disponibles algunas funciones globalmente para debugging
window.mathProgrammingApp = {
    cambiarIdioma,
    version: '1.0.0',
    estudiantes: 'Grado 11 - 2025'
};