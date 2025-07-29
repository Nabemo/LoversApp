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

tg.ready();
tg.expand();