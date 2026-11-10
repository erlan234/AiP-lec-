const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'tc2024';
const client = new MongoClient(url);

let db; // Переменная для хранения подключения

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log('Успешно подключено к MongoDB');
        return db;
    } catch (error) {
        console.error('Ошибка подключения:', error);
        throw error;
    }
};

// Экспортируем функцию подключения и саму базу
module.exports = connectDB;