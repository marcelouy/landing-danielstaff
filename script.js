// Smooth scrolling para enlaces ancla
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer para animaciones fade-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar todos los elementos con clase fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Efecto flotante para tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy loading para imágenes (optimización adicional)
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});

// Efecto de scroll en el header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.transform = 'translateY(-5px)';
    } else {
        header.style.transform = 'translateY(0)';
    }
});

// Tracking de clicks en botones WhatsApp (opcional para analytics)
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Aquí puedes agregar Google Analytics o tracking personalizado
        // gtag('event', 'click', {
        //     event_category: 'WhatsApp',
        //     event_label: 'Contact Button'
        // });
    });
});

// Funcionalidad adicional: Contador animado para estadísticas
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        // Iniciar animación cuando el elemento sea visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Inicializar animaciones de contador
document.addEventListener('DOMContentLoaded', animateCounters);

// Mejorar rendimiento: Throttle para eventos scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle al scroll del header
const throttledScroll = throttle(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.transform = 'translateY(-5px)';
    } else {
        header.style.transform = 'translateY(0)';
    }
}, 100);

// Reemplazar el event listener original con la versión optimizada
window.removeEventListener('scroll', window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.transform = 'translateY(-5px)';
    } else {
        header.style.transform = 'translateY(0)';
    }
}));

window.addEventListener('scroll', throttledScroll);

// Preloader opcional (puedes activarlo si necesitas)
function showPreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-size: 1.5rem;
        ">
            <div style="text-align: center;">
                <i class="fas fa-cut" style="font-size: 3rem; margin-bottom: 1rem; animation: spin 2s linear infinite;"></i>
                <p>Cargando...</p>
            </div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // Ocultar preloader cuando la página cargue
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    });
}

// Funcionalidad para galería expandible (opcional)
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            // Crear modal para imagen expandida
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
            `;
            
            const expandedImg = document.createElement('img');
            expandedImg.src = this.src;
            expandedImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 10px;
            `;
            
            modal.appendChild(expandedImg);
            document.body.appendChild(modal);
            
            // Cerrar modal al hacer click
            modal.addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
}

// Inicializar galería modal cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initGalleryModal();
});

// Validación de formulario (si agregas un formulario de contacto)
function validateContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Por favor completa todos los campos');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor ingresa un email válido');
                return;
            }
            
            // Aquí puedes enviar el formulario o integrarlo con tu backend
            alert('¡Mensaje enviado correctamente!');
            form.reset();
        });
    }
}

// Función auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Efecto parallax suave para el header (opcional)
function initParallaxEffect() {
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }, 10));
}

// Detección de dispositivo móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizaciones específicas para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor rendimiento
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Desactivar efectos hover en móvil
    document.body.classList.add('mobile-device');
}

// Funcionalidad de modo oscuro (opcional)
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Recuperar preferencia de modo oscuro
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// Inicializar todas las funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Landing Page Peluquería cargada correctamente');
    
    // Funcionalidades opcionales - descomenta las que necesites
    // showPreloader();
    // initParallaxEffect();
    // initDarkMode();
    validateContactForm();
});

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error en la página:', e.error);
});

// Optimización: Cargar recursos críticos primero
function preloadCriticalResources() {
    const criticalImages = [
        './images/hero-bg.jpg',
        './images/about-salon.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Ejecutar preload al cargar el script
preloadCriticalResources();