const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  };

  async retrieveMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  };

  async createMovie({ data }) {
    const movie = await this.mongoDB.create(this.collection, data);
    return movie || {};
  };

  async updateMovie({ movieId, data } = {}) {
    const movie = await this.mongoDB.update(this.collection, movieId, data);
    return movie;
  };

  async deleteMovie({ movieId }) {
    const movie = await this.mongoDB.delete(this.collection, movieId);
    return movie;
  };
}

module.exports = { MoviesService };