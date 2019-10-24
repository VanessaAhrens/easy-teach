const express = require('express');
const lessonRoutes = express.Router();


let Lesson = require('../models/Lesson');

//now we define the rest endpoints for the CRUD methods and implement the CRUD methods
//R: read all lessons

lessonRoutes.get('/search', (req, res) => {
    Lesson.find({lesson_name: req.query.query}).then(
        lesson => 
        res.json(lesson)
    )
    .catch(err => res.send(err))
});

lessonRoutes.route('/read').get(function (req, res) {
    console.log("got a request");
    Lesson.find(function (err, lessons) {
        if (err) {
            console.log(err);
        } else {
            res.json(lessons);
        }
    });
});

//C: create a new Lesson

lessonRoutes.route('/add').post(function (req, res) {
    console.log("Request to save this Lesson:" + JSON.stringify(req.body));
    let lesson = new Lesson(req.body);
    lesson.save()
        .then(lesson => {
            res.status(200).json(lesson);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

//R: read one lesson defined be the id of the lesson

lessonRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Lesson.findById(id, function (err, lesson) {
        res.json(lesson);
    });
});

//U: update the lesson with the given id
// post -> put
lessonRoutes.put('/update/:id', (req, res) => {
    Lesson.findByIdAndUpdate(req.params.id, req.body).then(
    lesson => {
        res.json(lesson)
    });
});

//D: delete the lesson with the given id
// get -> post
lessonRoutes.route('/delete/:id').post(function (req, res) {
    Lesson.findByIdAndDelete(req.params.id, function (err, lesson) {
        if (!lesson)
            res.status(404).send("data is not found");
        else
            res.json('lesson deleted!');
    });
});


module.exports = lessonRoutes;