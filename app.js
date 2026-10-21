const express = require('express');
const path = require('path');
const app = express();

// Настройка шаблонизатора EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Подключение ejs-locals для работы layout (каркаса)
const engine = require('ejs-locals');
app.engine('ejs', engine);

// Middleware для форм
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключение статических файлов (картинки, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Подключение роутеров
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});