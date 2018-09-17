const express = require('express');
const session = require('cookie-session');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(session({secret: 'todotopsecret'}))

.use((req, res, next) => {

    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

.use((req, res, next) => {
    req.session.hobbies = {
      one: 'basketball',
      two: 'programming'
    };
    next();
})

.get('/hobbies', (req, res) => {
    res.render('hobbies.ejs', {hobbies: req.session.hobbies});
})

.get('/todo', (req, res) => {
    res.render('todo.ejs', {todolist: req.session.todolist, title: 'Welcome to Todo'});
})

.post('/todo/ajouter/', urlencodedParser, (req, res) => {
    if (req.body.newtodo != '' && req.body.newtodo.indexOf(' ') >= 0) {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

.get('/todo/supprimer/:id', (req, res) => {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

.use((req, res, next) => {
    res.redirect('/todo');
})

.listen(3000);
