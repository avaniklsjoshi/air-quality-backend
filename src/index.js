const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {PORT} = require('../configs/constants');
const {startDatabase} = require('./database/mongo');
const {insertCity, getCities, deleteCity, updateCity} = require('./database/cities');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://avanijoshi.auth0.com/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: 'https://air-quality',
  issuer: `https://avanijoshi.auth0.com/`,
  algorithms: ['RS256'],
});
app.use(checkJwt);
// defining an endpoint to return all cities
app.get('/', async (req, res) => {
  res.send(await getCities());
});
app.post('/', async (req, res) => {
  const newCity= req.body;
  await insertCity(newCity);
  res.send({message: 'New city inserted.'});
});

// endpoint to delete a City
app.delete('/:id', async (req, res) => {
  await deleteCity(req.params.id);
  res.send({message: 'City removed.'});
});

// endpoint to update a City
app.put('/:id', async (req, res) => {
  const updatedCity= req.body;
  await updateCity(req.params.id, updatedCity);
  res.send({message: 'City updated.'});
});

startDatabase().then(async () => {
  // starting the server
  app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
  });
});
