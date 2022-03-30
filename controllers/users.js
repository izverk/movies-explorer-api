const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const {
  BadRequestError,
  DuplicateMongoError,
  UnauthorizedError,
  NotFoundError,
} = require('../errors/index');
const {
  userNotFound,
  incorrectData,
  saltRounds,
  mongoDuplicateKeyErrorCode,
  mongoDuplicateKey,
  incorrectEmailOrPassword,
  secretKey,
} = require('../utils/constants');

// РЕГИСТРАЦИЯ ПОЛЬЗОВАТЕЛЯ (создание)
exports.createUser = (req, res, next) => {
  const {
    email, name, password,
  } = req.body;
  // хешируем пароль и сохраняем данные в базе
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      User.create({
        email, name, password: hash,
      })
        .then((user) => {
          res.status(200).send({
            name: user.name,
            _id: user._id,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(incorrectData));
          } else if (err.code === mongoDuplicateKeyErrorCode) {
            next(new DuplicateMongoError(mongoDuplicateKey));
          } else next(err);
        });
    })
    .catch(next);
};

// ВХОД ПОЛЬЗОВАТЕЛЯ (логин, аутентификация)
exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).orFail().select('+password')
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(incorrectEmailOrPassword));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : secretKey,
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new UnauthorizedError(incorrectData));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new UnauthorizedError(userNotFound));
      } else next(err);
    });
};

// ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id).orFail()
    .then((user) => {
      res.status(200).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(incorrectData));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(userNotFound));
      } else next(err);
    });
};

// ОБНОВЛЕНИЕ ДАННЫХ ПОЛЬЗОВАТЕЛЯ
exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { email, name }, { new: true, runValidators: true }).orFail()
    .then((user) => res.status(200).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === ('CastError' || 'ValidationError')) {
        next(new BadRequestError(incorrectData));
      } else if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError(userNotFound));
      } else next(err);
    });
};
