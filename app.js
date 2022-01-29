// pkill -f node
// brew services start mongodb-community@4.4
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then((res) => {
    console.log(
      `Connected to Mongo! Database name: ${res.connections[0].name}`,
    );
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

// подключаем мидлвары, роуты и всё остальное...
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '61f41987defe1781e864508d', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/', userRoutes);
app.use('/', cardsRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
