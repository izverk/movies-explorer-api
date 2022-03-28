require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const routes = require('./routes/index');
const { auth } = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { login, createUser } = require('./controllers/users');
const {
  userCreationJoiScheme,
  userLoginJoiScheme,
} = require('./validation/joiSchemes');
const { simpleCorsHandler, preflightCorsHandler } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

app.use(bodyParser.json());

// логгер запросов
app.use(requestLogger);

// CORS
// обработчик простых CORS-запросов
app.use(simpleCorsHandler);
// обработчик предварительных CORS-запросов
app.use(preflightCorsHandler);

// // код для краш-теста
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// роуты, не требующие авторизации (регистрация и вход)
app.post('/signup', celebrate(userCreationJoiScheme), createUser);
app.post('/signin', celebrate(userLoginJoiScheme), login);

// защита маршрутов авторизацией (проверка токена)
app.use(auth);

// маршрутизация
app.use(routes);

// логгер ошибок
app.use(errorLogger);

// сборщик-обработчик ошибок валидации celebrate (генерирует объект ошибки с полным описанием и
//  передает дальше в централизованный обработчик)
app.use(errors());

// централизованный обработчик ошибок
app.use(handleErrors);

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  })
    .then(() => { console.log('Установлено соединение с БД!'); })
    .catch((err) => { console.log('Ошибка при соединении с БД!:', err); });

  app.listen(PORT, () => {
    console.log(`Приложение запущено на порту ${PORT}!`);
  });
};

main();
