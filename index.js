const express = require('express');
const app = express();

const cors = require('cors');

// Config
const { config } = require('./config');
const { moviesApi } = require('./routes/movies');

const { errorHandler, logErrors, wrapErrors } = require('./utils/middleware/errorHandlers');
const { notFoundHandler } = require('./utils/middleware/notFoundHandler');

// Body parser middleware
app.use(express.json());
// Middleware cors
app.use(cors());

// routes
moviesApi(app);
// catch 404 middleware
app.use(notFoundHandler);


// Error middleware should always come after route middleware.
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening on port: http://localhost:${config.port}`);
});