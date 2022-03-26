const { Joi } = require('celebrate');

exports.userCreationJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

exports.userLoginJoiScheme = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

exports.userUpdateJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

exports.movieCreationJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
  }),
};

exports.movieParamsJoiScheme = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};
