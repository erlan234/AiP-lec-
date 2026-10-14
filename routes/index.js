var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Страница Audi A7 */
router.get('/audi-a7', function(req, res, next) {
  res.render('car', {
    title: "Audi A7",
    picture: "/images/audi_a7.webp",
    desc: "Спортивный седан бизнес-класса. Мощный двигатель, элегантный дизайн, полный привод. Идеальна для динамичной езды и комфортных путешествий."
  });
});

/* Страница Audi A6 */
router.get('/audi-a6', function(req, res, next) {
  res.render('car', {
    title: "Audi A6",
    picture: "/images/audi_a6.webp",
    desc: "Классический бизнес-седан. Сочетает комфорт, технологии и управляемость. Отличный выбор для города и трассы."
  });
});

/* Страница Audi A5 */
router.get('/audi-a5', function(req, res, next) {
  res.render('car', {
    title: "Audi A5",
    picture: "/images/audi_a5.webp",
    desc: "Спортивное купе с элегантным силуэтом. Динамичная, стильная и технологичная. Для тех, кто ценит драйв и внешний вид."
  });
});

module.exports = router;