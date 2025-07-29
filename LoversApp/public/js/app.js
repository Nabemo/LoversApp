// Создаем падающие частицы
function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Случайные параметры
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * window.innerWidth;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 5;
        
        // Применяем параметры
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = '-10px';
        particle.style.animation = `fall ${duration}s linear ${delay}s infinite`;
        
        document.body.appendChild(particle);
    }
}

// Анимация падения
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px);
        }
    }
`;
document.head.appendChild(style);

// Инициализация Telegram WebApp
const tg = window.Telegram.WebApp;

document.getElementById('createBtn').addEventListener('click', () => {
    tg.expand();
    window.location.href = 'creator.html';
});

document.getElementById('openBtn').addEventListener('click', () => {
    const code = prompt('Введите код открытки:');
    if (code) {
        window.location.href = `viewer.html?code=${encodeURIComponent(code)}`;
    }
});

// Запускаем создание частиц при загрузке
window.addEventListener('load', () => {
    createParticles();
    tg.ready();
    tg.expand();
});