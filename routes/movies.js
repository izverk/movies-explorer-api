const cardRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  movieCreationJoiScheme,
  movieParamsJoiScheme,
} = require('../validation/joiSchemes');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/cards');

cardRoutes.post('/', celebrate(movieCreationJoiScheme), createMovie);
cardRoutes.get('/', getMovies);
cardRoutes.delete('/:_id', celebrate(movieParamsJoiScheme), deleteMovie);

module.exports = cardRoutes;
