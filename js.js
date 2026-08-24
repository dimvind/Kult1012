function sendToDeveloper() {
    // 1. Получаем значение из поля ввода
    const inputElement = document.getElementById('nicknameInput');
    const nickname = inputElement.value.trim();

    // Проверка: если поле пустое, не отправляем запрос
    if (nickname === "") {
        alert("Пожалуйста, введите никнейм!");
        return;
    }

    // 2. ДАННЫЕ ВАШЕГО БОТА (ЗАМЕНИТЕ НА СВОИ)
    // Вставляйте токен ОЧЕНЬ аккуратно, чтобы не удалить двоеточие или буквы
    const token = '8928798938:AAHnetiA-bp_uVdXb6YGEe8n8FYjCA8Twl8'; 
    const chatId = '5535870609'; // Должны быть только цифры (например: 12345678)

    // Формируем текст сообщения
    const messageText = `Новый никнейм с сайта: ${nickname}`;

    // 3. ОТПРАВКА ЗАПРОСА В TELEGRAM
    fetch(`https://telegram.org{token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: messageText
        })
    })
    .then(response => {
        // Проверяем, ответил ли Telegram успешно (код 200)
        if (response.ok) {
            alert('✨ Никнейм успешно отправлен разработчику!');
            inputElement.value = ""; // Очищаем поле после успешной отправки
        } else {
            // Если Telegram вернул ошибку (например, неверный ID или Токен)
            return response.json().then(errorData => {
                console.error('Ошибка от Telegram API:', errorData);
                alert(`Ошибка Telegram: ${errorData.description}`);
            });
        }
    })
    .catch(error => {
        // Если запрос вообще не дошел (нет интернета, заблокирован VPN и т.д.)
        console.error('Сетевая ошибка:', error);
        alert(`Ошибка сети! Проверьте VPN. Технический текст: ${error.message}`);
    });
}

const form = document.getElementById('form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "7a232bea-86da-4ae5-8674-417c669ad0c1");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert("Success! Your message has been sent.");
            form.reset();
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Something went wrong. Please try again.");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
