const { Joi } = require('celebrate');

exports.userCreationJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    // email: Joi.string().email().required(),
    email: Joi.string().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).required(),
    password: Joi.string().required(),
  }),
};

exports.userLoginJoiScheme = {
  body: Joi.object().keys({
    email: Joi.string().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).required(),
    password: Joi.string().required(),
  }),
};

exports.userUpdateJoiScheme = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i).required(),
  }),
};

exports.movieCreationJoiScheme = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
    trailerLink: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
    thumbnail: Joi.string().required().pattern(/^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

exports.movieParamsJoiScheme = {
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
};
