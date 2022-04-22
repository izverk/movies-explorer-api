const Movie = require('../models/movie');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/index');
const {
  movieNotFound,
  incorrectData,
  cantDeleteNotOwnMovie,
} = require('../utils/constants');

// СОЗДАНИЕ ФИЛЬМА (сохранение в БД)
exports.createMovie = (req, res, next) => {
  const movieData = req.body;
  const { _id: owner } = req.user;
  Movie.create({ ...movieData, owner })
    .then((movie) => {
      res.status(200).send(movie._doc);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};

exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

exports.deleteMovie = (req, res, next) => {
  const currentUserId = req.user._id;
  // сначала ищем фильм и проверяем, что он есть (база не возвращает ошибку, если не найден)
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(movieNotFound);
      }
      const ownerId = movie.owner.toString();
      if (ownerId !== currentUserId) {
        throw new ForbiddenError(cantDeleteNotOwnMovie);
      }
      Movie.findByIdAndRemove(req.params._id) // удаляем фильм после проверки его наличия
        .then((removedMovie) => {
          res.status(200).send(removedMovie._doc);
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError(incorrectData));
          } else next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(incorrectData));
      } else next(err);
    });
};
