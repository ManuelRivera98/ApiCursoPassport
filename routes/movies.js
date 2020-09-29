const express = require('express');
const { MoviesService } = require('../services/movies');

const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');
const { validationHandler } = require('../utils/middleware/validationHandler');

const slash = require('express-slash');

const moviesApi = (app) => {

  // config slash middleware
  app.enable('strict routing');

  const router = express.Router({
    caseSensitive: app.get('case sensitive route'),
    strict: app.get('strict routing')
  });
  app.use('/api/movies', router);
  // Middleware slash
  app.use(slash());
  // Instance service
  const movieService = new MoviesService();

  router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await movieService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'Movies listed.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movie = await movieService.retrieveMovie({ movieId });

      res.status(200).json({
        data: movie,
        message: 'Movie retrieve.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createMovieSchema), async (req, res, next) => {
    const { body: data } = req;
    try {
      const movie = await movieService.createMovie({ data });

      res.status(201).json({
        data: movie,
        message: 'Movie created.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), validationHandler(updateMovieSchema), async (req, res, next) => {
    const { body: data } = req;
    const { movieId } = req.params;
    try {
      const movie = await movieService.updateMovie({ movieId, data })

      res.status(200).json({
        data: movie,
        message: 'Movie updated.',
      });
    } catch (error) {
      next(error);
    }
  });

  router.patch('/:movieId', async (req, res, next) => {
    const { movieId } = req.params;
    const { body: data } = req;

    try {
      const movie = await movieService.partialUpdate({ movieId, data });

      res.status(200).json({
        data: movie,
        message: 'movie partial updated',
      });
    } catch (error) {
      next(error);
    }
  })

  router.delete('/:movieId', validationHandler({ movieId: movieIdSchema }, 'params'), async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const id = await movieService.deleteMovie({ movieId });
      res.status(204).json(id);
    } catch (error) {
      next(error);
    }
  });
}

module.exports = { moviesApi };