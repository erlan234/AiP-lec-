const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'tc2024';
const client = new MongoClient(url);

// Вот наша функция
const connectDB = async () => {
    try {
        await client.connect();
        console.log('Успешно подключено к MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Ошибка подключения:', error);
    }
};

// Обязательно экспортируем её!
module.exports = connectDB;