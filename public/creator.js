document.addEventListener('DOMContentLoaded', () => {
    // Инициализация Telegram WebApp
    if (window.Telegram && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
    }

    const editor = {
        elements: [],
        addText() {
            const text = prompt("Введите текст открытки:");
            if (text) {
                const element = { type: 'text', content: text };
                this.elements.push(element);
                this.updatePreview();
            }
        },
        addImage() {
            const url = prompt("Введите URL изображения:");
            if (url) {
                const element = { type: 'image', content: url };
                this.elements.push(element);
                this.updatePreview();
            }
        },
        updatePreview() {
            const preview = document.getElementById('preview');
            preview.innerHTML = '';
            this.elements.forEach(el => {
                if (el.type === 'text') {
                    const p = document.createElement('p');
                    p.textContent = el.content;
                    preview.appendChild(p);
                } else if (el.type === 'image') {
                    const img = document.createElement('img');
                    img.src = el.content;
                    img.style.maxWidth = '100%';
                    preview.appendChild(img);
                }
            });
        },
        save() {
            if (this.elements.length === 0) {
                alert("Добавьте хотя бы один элемент!");
                return;
            }

            const card = {
                date: new Date(),
                elements: this.elements
            };

            const code = 'CARD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
            localStorage.setItem(code, JSON.stringify(card));
            
            alert(`Открытка сохранена! Код: ${code}`);
            
            if (window.Telegram && Telegram.WebApp) {
                Telegram.WebApp.close();
            }
        }
    };

    document.getElementById('addText').addEventListener('click', () => editor.addText());
    document.getElementById('addImage').addEventListener('click', () => editor.addImage());
    document.getElementById('saveBtn').addEventListener('click', () => editor.save());
});