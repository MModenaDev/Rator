require('dotenv').config()

const express      = require('express');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

mongoose
  .connect('mongodb://localhost/raptor', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Rator';

const index = require('./routes/index');
app.use('/', index);
const review = require('./routes/reviewRoutes');
app.use('/review', review);
const user = require('./routes/userRoutes');
app.use('/user', user);
const curator = require('./routes/curatorRoutes');
app.use('/curator', curator);

module.exports = app;