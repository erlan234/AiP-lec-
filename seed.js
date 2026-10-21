const connectDB = require('./db');

const cars = [
    {
        title: "Audi A7",
        picture: "/images/audi_a7.webp",
        desc: "Спортивный седан бизнес-класса. Мощный двигатель, элегантный дизайн, полный привод. Идеальна для динамичной езды и комфортных путешествий."
    },
    {
        title: "Audi A6",
        picture: "/images/audi_a6.webp",
        desc: "Классический бизнес-седан. Сочетает комфорт, технологии и управляемость. Отличный выбор для города и трассы."
    },
    {
        title: "Audi A5",
        picture: "/images/audi_a5.webp",
        desc: "Спортивное купе с элегантным силуэтом. Динамичная, стильная и технологичная. Для тех, кто ценит драйв и внешний вид."
    }
];

async function seed() {
    try {
        const db = await connectDB();
        const collection = db.collection('cars'); // Создаем коллекцию 'cars'
        
        // Очищаем старые данные (если запускаем повторно)
        await collection.deleteMany({});
        
        // Вставляем наши машины
        await collection.insertMany(cars);
        
        console.log('Данные успешно добавлены в базу!');
        process.exit(0); // Завершаем скрипт
    } catch (err) {
        console.error('Ошибка при добавлении данных:', err);
        process.exit(1);
    }
}

seed();