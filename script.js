let currentCoins = 0;

function navigateTo(page) {
    document.querySelectorAll('.page, #main-menu').forEach(el => el.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

function moveSnake(direction) {
    // Логика управления змейкой
}

function updateCoinCount() {
    document.getElementById('coin-count').innerText = currentCoins;
}

function recharge() {
    // Логика пополнения баланса
}

function withdraw() {
    // Логика вывода средств
}

// Пример функции для запуска игры
function startGame() {
    navigateTo('play');
    // Инициализация и запуск игры "Змейка"
}

// Пример функции для сохранения монеток в базу данных
function saveCoins() {
    // Логика сохранения монеток в базу данных
}

// Пример функции для загрузки монеток из базы данных при запуске
function loadCoins() {
    // Логика загрузки монеток из базы данных
    currentCoins = 10; // Пример значения
    updateCoinCount();
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('main-menu');
    loadCoins();
});

// Функция для подключения к Telegram и получения username
function connectToTelegram() {
    // Логика подключения к Telegram и получения username
    const tgUsername = "example_username"; // Пример значения
    document.getElementById('tg-username').innerText = tgUsername;
}

// Подключение к Telegram при загрузке страницы
connectToTelegram();
