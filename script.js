// Menu Mobile - Hamburger
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação do hamburger
    hamburger.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Contador Animado de Estatísticas
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const step = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

// Iniciar contadores quando visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.textContent === '0') {
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Countdown Timer para Promoção
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    // Define o tempo final (24 horas a partir de agora)
    const now = new Date().getTime();
    const endTime = now + (24 * 60 * 60 * 1000); // 24 horas
    
    // Tenta recuperar o tempo final do localStorage
    let savedEndTime = localStorage.getItem('promoEndTime');
    
    if (!savedEndTime || parseInt(savedEndTime) < now) {
        // Se não existe ou já expirou, cria um novo
        savedEndTime = endTime;
        localStorage.setItem('promoEndTime', endTime);
    }
    
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = parseInt(savedEndTime) - now;
        
        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.textContent = '00:00:00';
            // Reinicia o contador
            localStorage.setItem('promoEndTime', new Date().getTime() + (24 * 60 * 60 * 1000));
            startCountdown();
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

startCountdown();

// Navegação Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Ajuste para compensar a navbar fixa
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar transparente e highlight de menu - CONSOLIDADO
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section[id]');
let lastScroll = 0;

// Função consolidada de scroll - mais eficiente
function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Navbar shadow
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Highlight menu ativo
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.style.color = '');
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
    
    // Botão voltar ao topo
    if (currentScroll > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
}

// Debounce otimizado
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(handleScroll);
}, { passive: true });

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação de entrada dos elementos ao rolar (otimizada)
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // Para de observar após animar
        }
    });
}, observerOptions);

// Elementos para animar - sem delays que causam lentidão
const animateElements = document.querySelectorAll('.diferencial-card, .receita-card, .contato-card, .pedido-box, .quem-sou-content, .depoimento-card');

animateElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.5s ease'; // Transição mais rápida
    observer.observe(el);
});

// Animação dos badges flutuantes - mais leve
const badges = document.querySelectorAll('.badge-float');
badges.forEach((badge) => {
    badge.style.opacity = '0';
    badge.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        badge.style.opacity = '1';
    }, 300);
});

// Highlight do menu ativo baseado na seção visível
const sections = document.querySelectorAll('section[id]');

// Mensagem de boas-vindas no console
console.log('%c🧁 Bolos da Wilma', 'color: #ff69b4; font-size: 24px; font-weight: bold;');
console.log('%cBolos caseiros feitos com amor! ❤️', 'color: #666; font-size: 14px;');

// Easter egg simplificado: Confetes ao clicar no logo 3 vezes
let logoClicks = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    logoClicks++;
    
    if (logoClicks === 3) {
        createConfetti();
        logoClicks = 0;
        
        const message = document.createElement('div');
        message.textContent = '🎉 Ganhe 5% extra no seu próximo pedido! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            padding: 2rem;
            border-radius: 20px;
            font-size: 1.1rem;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2500);
    }
    
    setTimeout(() => {
        logoClicks = 0;
    }, 2000);
});

function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#87ceeb', '#ff6b9d', '#c71585'];
    const confettiCount = 100;
    const emojis = ['🎂', '🍰', '🧁', '✨', '🎉', '🎈'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const isEmoji = Math.random() > 0.7;
        
        if (isEmoji) {
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.fontSize = '20px';
        } else {
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
        }
        
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-20px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.transition = 'all 3s ease-out';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        if (!isEmoji) {
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        }
        
        document.body.appendChild(confetti);
        
        const randomX = (Math.random() - 0.5) * 200;
        const randomRotation = Math.random() * 720;
        
        setTimeout(() => {
            confetti.style.top = window.innerHeight + 100 + 'px';
            confetti.style.left = parseFloat(confetti.style.left) + randomX + 'px';
            confetti.style.opacity = '0';
            confetti.style.transform = 'rotate(' + randomRotation + 'deg)';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Tracking de Cliques nos Botões de Pedido (simplificado)
const pedidoButtons = document.querySelectorAll('a[href*="#pedido"], a[href*="wa.me"], .btn-pedir-rapido');
pedidoButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('📨 Clique em botão de pedido');
    });
});

// Animação WhatsApp flutuante (simplificada)
window.addEventListener('load', () => {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.opacity = '1';
    }
});

// Carregar animações quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('✅ Site carregado com sucesso!');
});
