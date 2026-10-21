
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const connectDB = require('./db'); // НОВОЕ: Импортируем наш модуль

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// НОВОЕ: Запускаем сервер только после подключения к базе
connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
});