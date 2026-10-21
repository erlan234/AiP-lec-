const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    picture: { type: String, required: true },
    desc: { type: String, required: true }
});

const Car = mongoose.model('Car', carSchema, 'cars');

module.exports = Car;