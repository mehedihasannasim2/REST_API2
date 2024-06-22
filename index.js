const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
]

app.get('/', (req, res) => {
    res.send('Helloooo');
});


app.get('/api/courses/', (req, res) => {
    res.send(courses);
});


app.post('/api/courses/', (req, res) => {
    const { error } = validateCourse(req.body); // result.error "object distructure"
    if (error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    // const schema = {
    //     name : Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);
    // // console.log(result);

    // if (result.error) {
    //     // 400 Bad Request
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }

    // if (!req.body.name || req.body.name.length < 3) {
    //     // 400 Bad Request
    //     res.status(400).send('Name is required & should be minimum 3 character');
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) =>{
    // loop up the course
    // if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('This course with the given ID was not found.');


    // validate
    // if invalid, return 400 - bad request

    const { error } = validateCourse(req.body); // result.error
    if (error) {
        // 400 Bad Request
        res.status(400).send(result.error.details[0].message);
        return;
    }
 
    // Update course
    // return the updated course
    course.name = req.body.name;
    res.send(course)

});

function validateCourse(course) {
    const schema = {
        name : Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('This course with the given ID was not found.');
    res.send(course);
});


// PORT
// env server is set to 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..!!`)); 