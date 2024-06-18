require('dotenv').config();
var mongoose = require('mongoose');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const routerApidocs = require('./routes/apidocs');
const routerAlunos = require('./routes/alunos');
const routerCursos = require('./routes/cursos');

var app = express();

mongoose.connect(process.env.MONGODB_URL);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api-docs', routerApidocs);
app.use('/alunos', routerAlunos);
app.use('/cursos', routerCursos);

module.exports = app