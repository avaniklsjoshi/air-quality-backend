import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { PORT } from "../configs/constants";
import { startDatabase } from "./database/mongo";
import {
  insertCity,
  getCities,
  deleteCity,
  updateCity
} from "./database/cities";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import { JWKS_URI, AUDIENCE, ALGORITHMS } from "../configs/constants";

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: JWKS_URI
  }),
  // Validate the audience and the issuer.
  aud: AUDIENCE,
  // issuer: ISSUER,
  algorithms: ALGORITHMS
});
app.use(checkJwt);

// defining an endpoint to return all cities
app.get("/", async (req, res) => {
  res.send(await getCities());
});

app.post("/", async (req, res) => {
  const newCity = req.body;
  await insertCity(newCity);
  res.send({ message: "New city inserted." });
});

// endpoint to delete a City
app.delete("/:id", async (req, res) => {
  await deleteCity(req.params.id);
  res.send({ message: "City removed." });
});

// endpoint to update a City
app.put("/:id", async (req, res) => {
  const updatedCity = req.body;
  await updateCity(req.params.id, updatedCity);
  res.send({ message: "City updated." });
});

startDatabase().then(async () => {
  // starting the server
  app.listen(PORT, () => {
    console.log("listening on port: ", PORT);
  });
});
