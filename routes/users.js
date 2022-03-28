const userRoutes = require('express').Router();
const { celebrate } = require('celebrate');
const {
  userUpdateJoiScheme,
} = require('../validation/joiSchemes');
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/me', getCurrentUser);
userRoutes.patch('/me', celebrate(userUpdateJoiScheme), updateUser);

module.exports = userRoutes;
