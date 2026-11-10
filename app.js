const session = require('express-session');
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const connectDB = require('./db'); 

// НОВОЕ: Подключаем MongoStore и клиент MongoDB
const MongoStore = require('connect-mongo').default;
const { MongoClient } = require('mongodb');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// НОВОЕ: Настройка сессий с сохранением в MongoDB
app.use(session({
  secret: 'my-super-secret-key', 
  resave: false,                 
  saveUninitialized: false,      
  // Говорим express-session использовать MongoDB как хранилище
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/tc2024', // Ваша база
    collectionName: 'sessions', // Имя коллекции для сессий
    ttl: 24 * 60 * 60 // Время жизни сессии в секундах (24 часа)
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false                
  }
}));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
}).catch(err => {
    console.error('Не удалось запустить сервер из-за ошибки БД:', err);
});