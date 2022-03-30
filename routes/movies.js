const movieRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  movieCreationJoiScheme,
  movieParamsJoiScheme,
} = require('../validation/joiSchemes');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRoutes.post('/', celebrate(movieCreationJoiScheme), createMovie);
movieRoutes.get('/', getMovies);
movieRoutes.delete('/:_id', celebrate(movieParamsJoiScheme), deleteMovie);

module.exports = movieRoutes;
