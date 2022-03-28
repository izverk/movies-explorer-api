// сообщения ответов сервера
const userNotFound = 'Пользователь не найден';
const movieNotFound = 'Фильм с указанным _id не найден';
const incorrectData = 'Переданы некорректные данные';
const mongoDuplicateKey = 'Пользователь с таким email уже существует';
const authorizationRequired = 'Требуется авторизация';
const cantDeleteNotOwnMovie = 'Нельзя удалить чужой фильм';
const incorrectEmailOrPassword = 'Неверный email или пароль';

// количество проходов для хеширования пароля пользователя
const saltRounds = 10;

// код ошибки дублирования уникального ключа MongoDB
const mongoDuplicateKeyErrorCode = 11000;

// ключ для токена
const secretKey = 'secret-key-for-token-diploma';

// массив разрешенных доменов для кросс-доменных запросов
const allowedCors = [
  'http://izverk.students.nomoredomains.xyz',
  'http://localhost:3000',
  'https://izverk.students.nomoredomains.xyz',
  'https://localhost:3000',
];

// список разрешенных методов для кросс-доменных запросов
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  userNotFound,
  movieNotFound,
  incorrectData,
  saltRounds,
  mongoDuplicateKeyErrorCode,
  mongoDuplicateKey,
  incorrectEmailOrPassword,
  authorizationRequired,
  cantDeleteNotOwnMovie,
  secretKey,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
