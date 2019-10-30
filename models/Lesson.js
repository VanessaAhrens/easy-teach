const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create an object to create, read, update and delete lesson data in the MongoDB

let Lesson = new Schema({
    //we do not need to define the _id to identify the lesson, mongoose does this automatically
    lesson_ID: {
        type: String
    },
    lesson_name: {
        type: String
    },
    lesson_duration: {
        type: Number
    },
    lesson_location: {
        type: String
    },
    lesson_price: {
        type: Number
    },
    lesson_equip: {
        type: String
    },
    lesson_language: {
        type: String
    },
    lesson_amountPeople: {
        type: String
    },
    lesson_eMailTeacher: {
        type: String
    },
    lesson_aboutTeacher: {
        type: String
    },
    lesson_pictureURL: {
        type: String
    },
    lesson_rating: {
        type: Number
    },
    lesson_peopleRating: {
        type: [String]
    },
    lesson_overallAmountOfRating: {
        type: Number
    }

    


});

module.exports = mongoose.model('Lesson', Lesson);