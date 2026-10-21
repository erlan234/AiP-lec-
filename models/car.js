const mongoose = require('mongoose');

// 7.2. Создание схемы данных
const carSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true // Поле обязательно для заполнения
    },
    picture: { 
        type: String, 
        required: true // Путь к картинке обязателен
    },
    desc: { 
        type: String, 
        required: true // Описание обязательно
    }
});


// 7.3. Создание модели данных
const Car = mongoose.model('Car', carSchema, 'cars');

module.exports = Car;