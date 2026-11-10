var express = require('express');
var router = express.Router();
// Импортируем нашу функцию для получения базы
const { getDB } = require('../db'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// --- НОВОЕ ИЗ ПУНКТА 9.2 ---
// Тестовый маршрут для проверки сессий. 
// ВАЖНО: он должен быть ДО маршрута /:id !
router.get('/test-session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Вы посетили эту страницу ${req.session.views} раз(а).`);
});
// ---------------------------

/* ДИНАМИЧЕСКИЙ МАРШРУТ (чистый код) */
router.get('/:id', async function(req, res, next) {
  var carId = req.params.id; 

  try {
    // Берем УЖЕ подключенную базу
    const db = getDB();
    const collection = db.collection('cars'); 

    // Ищем машину
    const car = await collection.findOne({ id: carId }); 

    if (!car) {
      return res.status(404).send('Машина не найдена в базе');
    }

    // Передаем в шаблон
    res.render('car', {
      title: car.title,
      picture: car.picture,
      desc: car.desc
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router;