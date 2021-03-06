const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const productionRouter = require('./routes/production.router');
const rehearsalRouter = require('./routes/rehearsal.router');
const artistRouter = require('./routes/artists.router');
const rehearsalsArtistsRouter = require('./routes/rehearsalsArtists.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/production', productionRouter);
app.use('/api/rehearsal', rehearsalRouter);
app.use('/api/artists', artistRouter); 
app.use('/api/rehearsalsArtists', rehearsalsArtistsRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
