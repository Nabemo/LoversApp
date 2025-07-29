document.getElementById('saveBtn').addEventListener('click', () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    alert(`Ваш код открытки: ${code}\nПоделитесь им с друзьями!`);
    localStorage.setItem(`card_${code}`, JSON.stringify({
        content: "Ваша открытка"
    }));
});