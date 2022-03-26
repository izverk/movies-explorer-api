const routes = require('express').Router();
const userRoutes = require('./users');
// const movieRoutes = require('./movies');
const { NotFoundError } = require('../errors/index');

routes.use('/users', userRoutes);
// routes.use('/movies', movieRoutes);

// обработка не существующего маршрута
routes.use((req, res, next) => {
  next(new NotFoundError('Запрошена не существующая страница'));
});

module.exports = routes;
