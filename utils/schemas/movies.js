const Joi = require('@hapi/joi');
const Join = require('@hapi/joi');

const movieIdSchema = Join.string().regex(/^[0-9a-fA-F]{24}$/);
const movieTitleSchema = Joi.string().max(80);
const movieYearSchema = Joi.number().min(1888).max(2077);
const movieCoverSchema = Joi.string().uri();
const movieDescription = Join.string().max(300);
const movieDurationSchema = Joi.number().min(1).max(300);
const movieContentRating = Joi.number().max(5);
const movieSourceSchema = Joi.string().uri();
const movieTagsSchema = Join.array().items(Joi.string().max(50));


const createMovieSchema = {
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescription.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRating.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema.required()
}

const updateMovieSchema = {
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescription,
  duration: movieDurationSchema,
  contentRating: movieContentRating,
  source: movieSourceSchema,
  tags: movieTagsSchema
};

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};