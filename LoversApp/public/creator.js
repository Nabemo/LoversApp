document.addEventListener('DOMContentLoaded', () => {
    // Инициализация
    const MAX_SLIDES = 10;
    let currentSlideIndex = 0;
    let slides = [createNewSlide()];
    
    // Элементы DOM
    const slideContainer = document.getElementById('slideContainer');
    const addSlideBtn = document.getElementById('addSlideBtn');
    const prevSlideBtn = document.getElementById('prevSlide');
    const nextSlideBtn = document.getElementById('nextSlide');
    const slideCounter = document.getElementById('slideCounter');
    const addTextBtn = document.getElementById('addTextBtn');
    const addImageBtn = document.getElementById('addImageBtn');
    const addVideoBtn = document.getElementById('addVideoBtn');
    const addEffectBtn = document.getElementById('addEffectBtn');
    const textToolbar = document.getElementById('textToolbar');
    const effectControls = document.getElementById('effectControls');
    const imageUpload = document.getElementById('imageUpload');
    const saveCardBtn = document.getElementById('saveCardBtn');
    
    // Инициализация первого слайда
    renderSlides();
    
    // Функции слайдов
    function createNewSlide() {
        return {
            id: Date.now(),
            elements: [],
            effects: [],
            background: '#000000'
        };
    }
    
    function renderSlides() {
        slideContainer.innerHTML = '';
        const slide = slides[currentSlideIndex];
        
        // Создаем контейнер слайда
        const slideElement = document.createElement('div');
        slideElement.className = 'slide';
        slideElement.style.background = slide.background;
        slideElement.style.width = '100%';
        slideElement.style.height = '400px';
        slideElement.style.position = 'relative';
        
        // Добавляем элементы
        slide.elements.forEach(element => {
            const el = createElement(element);
            slideElement.appendChild(el);
        });
        
        // Добавляем эффекты
        slide.effects.forEach(effect => {
            applyEffect(slideElement, effect);
        });
        
        slideContainer.appendChild(slideElement);
        
        // Обновляем счетчик
        slideCounter.textContent = `Слайд ${currentSlideIndex + 1} из ${slides.length}`;
        
        // Обновляем превью слайдов
        renderSlidePreviews();
    }
    
    function renderSlidePreviews() {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'slide-preview';
        
        slides.forEach((slide, index) => {
            const thumb = document.createElement('div');
            thumb.className = `slide-thumb ${index === currentSlideIndex ? 'active' : ''}`;
            thumb.onclick = () => {
                currentSlideIndex = index;
                renderSlides();
            };
            previewContainer.appendChild(thumb);
        });
        
        // Удаляем старый превью
        const oldPreview = document.querySelector('.slide-preview');
        if (oldPreview) oldPreview.remove();
        
        slideContainer.appendChild(previewContainer);
    }
    
    function createElement(elementData) {
        let element;
        
        switch (elementData.type) {
            case 'text':
                element = document.createElement('div');
                element.className = 'element text-element';
                element.textContent = elementData.content;
                element.style.fontFamily = elementData.font;
                element.style.color = elementData.color;
                element.style.fontSize = elementData.size + 'px';
                element.style.left = elementData.x + 'px';
                element.style.top = elementData.y + 'px';
                break;
                
            case 'image':
                element = document.createElement('img');
                element.className = 'element media-element';
                element.src = elementData.content;
                element.style.left = elementData.x + 'px';
                element.style.top = elementData.y + 'px';
                break;
                
            case 'video':
                element = document.createElement('iframe');
                element.className = 'element media-element';
                element.src = elementData.content;
                element.frameBorder = "0";
                element.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                element.allowFullscreen = true;
                element.style.left = elementData.x + 'px';
                element.style.top = elementData.y + 'px';
                element.style.width = '300px';
                element.style.height = '200px';
                break;
        }
        
        // Делаем элементы перемещаемыми
        makeElementDraggable(element);
        return element;
    }
    
    function makeElementDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        element.onmousedown = dragMouseDown;
        
        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    
    // Эффекты
    function applyEffect(container, effectType) {
        switch (effectType) {
            case 'hearts':
                createHeartEffect(container);
                break;
            case 'sparks':
                createSparkEffect(container);
                break;
            case 'stars':
                createStarEffect(container);
                break;
        }
    }
    
    function createHeartEffect(container) {
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '24px';
            heart.style.zIndex = '999';
            heart.style.userSelect = 'none';
            heart.style.pointerEvents = 'none';
            
            // Начальная позиция
            const startX = Math.random() * container.offsetWidth;
            heart.style.left = startX + 'px';
            heart.style.top = '-30px';
            
            // Анимация падения
            const animation = heart.animate([
                { top: '-30px', opacity: 1 },
                { top: container.offsetHeight + 'px', opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 5000,
                delay: Math.random() * 2000,
                iterations: Infinity
            });
            
            container.appendChild(heart);
        }
    }
    
    function createSparkEffect(container) {
        // Реализация аналогична createHeartEffect
        // Можно добавить другие символы: ✨, ❄️, ★
    }
    
    function createStarEffect(container) {
        // Реализация аналогична createHeartEffect
    }
    
    // Обработчики событий
    addSlideBtn.addEventListener('click', () => {
        if (slides.length >= MAX_SLIDES) {
            alert(`Максимальное количество слайдов: ${MAX_SLIDES}`);
            return;
        }
        
        slides.push(createNewSlide());
        currentSlideIndex = slides.length - 1;
        renderSlides();
    });
    
    prevSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            renderSlides();
        }
    });
    
    nextSlideBtn.addEventListener('click', () => {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            renderSlides();
        }
    });
    
    addTextBtn.addEventListener('click', () => {
        textToolbar.style.display = 'block';
        effectControls.style.display = 'none';
        
        const text = prompt('Введите текст:', 'Ваш текст здесь');
        if (text) {
            const font = document.getElementById('fontSelect').value;
            const color = document.getElementById('textColor').value;
            const size = document.getElementById('textSize').value;
            
            slides[currentSlideIndex].elements.push({
                type: 'text',
                content: text,
                font: font,
                color: color,
                size: size,
                x: 50,
                y: 50
            });
            
            renderSlides();
        }
    });
    
    addImageBtn.addEventListener('click', () => {
        imageUpload.click();
    });
    
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                slides[currentSlideIndex].elements.push({
                    type: 'image',
                    content: event.target.result,
                    x: 100,
                    y: 100
                });
                renderSlides();
            };
            reader.readAsDataURL(file);
        }
    });
    
    addVideoBtn.addEventListener('click', () => {
        const url = prompt('Вставьте URL видео (YouTube или Vimeo):', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
        if (url) {
            slides[currentSlideIndex].elements.push({
                type: 'video',
                content: url,
                x: 100,
                y: 100
            });
            renderSlides();
        }
    });
    
    addEffectBtn.addEventListener('click', () => {
        effectControls.style.display = 'block';
        textToolbar.style.display = 'none';
    });
    
    document.getElementById('applyEffect').addEventListener('click', () => {
        const effectType = document.getElementById('effectSelect').value;
        slides[currentSlideIndex].effects.push(effectType);
        renderSlides();
    });
    
    saveCardBtn.addEventListener('click', () => {
        if (slides.length === 0 || slides[0].elements.length === 0) {
            alert('Добавьте хотя бы один элемент в открытку!');
            return;
        }
        
        const cardData = {
            slides: slides,
            created: new Date().toISOString()
        };
        
        // Генерируем уникальный код
        const code = 'CARD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
        
        // Сохраняем в localStorage
        localStorage.setItem(`card_${code}`, JSON.stringify(cardData));
        
        // Показываем код пользователю
        alert(`Открытка сохранена! Ваш код: ${code}\nПоделитесь этим кодом, чтобы другие могли увидеть вашу открытку.`);
        
        // В реальном Mini App можно было бы закрыть приложение
        // Telegram.WebApp.close();
    });
    
    // Инициализация Telegram WebApp
    if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
        Telegram.WebApp.ready();
        Telegram.WebApp.expand();
    }
});