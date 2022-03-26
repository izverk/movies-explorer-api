const mongoose = require('mongoose');
const { incorrectCardLink } = require('../utils/constants');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/,
      incorrectCardLink,
    ],
  },
  trailerLink: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/,
      incorrectCardLink,
    ],
  },
  thumbnail: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/([a-z0-9]{1})((\.[a-z0-9-])|([a-z0-9-]))*\.([a-z0-9]+)(\/[\w-.~:?#[\]@!$&'()*+,;=]+)*#?\/?$/,
      incorrectCardLink,
    ],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('card', movieSchema);
