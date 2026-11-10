const session = require('express-session');
const express = require('express');
const path = require('path');
const engine = require('ejs-locals');
const connectDB = require('./db'); 

// Подключаем MongoStore и клиент MongoDB
const MongoStore = require('connect-mongo').default;
const { MongoClient } = require('mongodb');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Настройка сессий с сохранением в MongoDB
app.use(session({
  secret: 'my-super-secret-key', 
  resave: false,                 
  saveUninitialized: false,      
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/tc2024', 
    collectionName: 'sessions', 
    ttl: 24 * 60 * 60 
  }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false                
  }
}));

// --- НОВОЕ (Пункт 9.4): Глобальный счетчик посещений ---
app.use(function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  // Делаем переменную views доступной во всех шаблонах EJS
  res.locals.views = req.session.views;
  next();
});
// -------------------------------------------------------

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000');
    });
}).catch(err => {
    console.error('Не удалось запустить сервер из-за ошибки БД:', err);
});