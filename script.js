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

// Navbar transparente ao rolar
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Adiciona sombra ao navbar quando rolar
    if (currentScroll > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Botão Voltar ao Topo
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animação de entrada dos elementos ao rolar (melhorada)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Elementos para animar com diferentes delays
const animateElements = document.querySelectorAll('.diferencial-card, .receita-card, .contato-card, .pedido-box, .quem-sou-content, .depoimento-card');

animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// Animação especial para os badges flutuantes
const badges = document.querySelectorAll('.badge-float');
badges.forEach((badge, index) => {
    setTimeout(() => {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
    }, 500 + (index * 300));
    badge.style.opacity = '0';
    badge.style.transform = 'scale(0.8)';
    badge.style.transition = 'all 0.5s ease';
});

// Highlight do menu ativo baseado na seção visível
const sections = document.querySelectorAll('section[id]');

function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Efeito parallax suave no hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Prevenir comportamento padrão dos links do WhatsApp
document.querySelectorAll('a[href^="https://wa.me"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Deixar o link funcionar normalmente
        return true;
    });
});

// Mensagem de boas-vindas no console
console.log('%c🧁 Bolos da Wilma', 'color: #ff69b4; font-size: 24px; font-weight: bold;');
console.log('%cBolos caseiros feitos com amor! ❤️', 'color: #666; font-size: 14px;');

// Lazy loading de imagens (caso sejam adicionadas no futuro)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Validação e formatação automática do WhatsApp (caso adicione formulário no futuro)
function formatWhatsApp(numero) {
    // Remove caracteres não numéricos
    numero = numero.replace(/\D/g, '');
    
    // Adiciona código do país se não tiver
    if (!numero.startsWith('55')) {
        numero = '55' + numero;
    }
    
    return numero;
}

// Easter egg: Confetes ao clicar no logo 3 vezes (melhorado)
let logoClicks = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    logoClicks++;
    logo.style.transform = 'scale(1.1)';
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 100);
    
    if (logoClicks === 3) {
        createConfetti();
        logoClicks = 0;
        
        // Mensagem especial
        const message = document.createElement('div');
        message.textContent = '🎉 Você descobriu o segredo! Ganhe 5% extra no seu próximo pedido! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 1.2rem;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: bounceIn 0.5s ease;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transform = 'translate(-50%, -50%) scale(0.8)';
            message.style.transition = 'all 0.3s ease';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
    
    // Reset contador após 2 segundos
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
    
    // Emoji de bolo gigante no centro
    const cake = document.createElement('div');
    cake.textContent = '🎂';
    cake.style.cssText = `
        position: fixed;
        font-size: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(cake);
    
    setTimeout(() => {
        cake.style.transform = 'translate(-50%, -50%) scale(1) rotate(360deg)';
    }, 10);
    
    setTimeout(() => {
        cake.style.transform = 'translate(-50%, -50%) scale(0) rotate(720deg)';
    }, 1500);
    
    setTimeout(() => {
        cake.remove();
    }, 2100);
}

// Performance: Debounce para eventos de scroll
function debounce(func, wait) {
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

// Aplicar debounce aos eventos de scroll
window.addEventListener('scroll', debounce(highlightNavOnScroll, 10));

// Efeito de Parallax mais suave e otimizado
let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            if (hero && lastScrollY < window.innerHeight) {
                hero.style.transform = `translateY(${lastScrollY * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Tracking de Cliques nos Botões de Pedido
const pedidoButtons = document.querySelectorAll('a[href*="#pedido"], a[href*="wa.me"], .btn-pedir-rapido');
pedidoButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('📨 Clique em botão de pedido:', button.textContent.trim());
        
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
});

// Efeito 3D nos cards
const cards = document.querySelectorAll('.receita-card, .depoimento-card, .diferencial-card');
cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Animação WhatsApp flutuante
window.addEventListener('load', () => {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'scale(1)';
        }, 1000);
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.transform = 'scale(0)';
        whatsappFloat.style.transition = 'all 0.5s ease';
    }
});

// Carregar animações apenas quando necessário
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    console.log('✅ Site carregado com sucesso!');
});
