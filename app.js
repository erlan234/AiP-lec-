const session = require('express-session');
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const connectDB = require('./db'); 

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ВОТ ЭТОТ БЛОК ОБЯЗАТЕЛЬНО ДОЛЖЕН БЫТЬ ЗДЕСЬ:
app.use(session({
  secret: 'my-super-secret-key', 
  resave: false,                 
  saveUninitialized: false,      
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false                
  }
}));

// Только ПОСЛЕ настройки сессий подключаем роутеры!
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
}).catch(err => {
    console.error('Не удалось запустить сервер из-за ошибки БД:', err);
});