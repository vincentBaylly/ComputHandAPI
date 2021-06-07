/* jslint node: true */
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const routes = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

//reads in configuration from a .env file
require("dotenv").config();

// Require configuration file defined in app/config.js
const config = require("./app/config/config");

var cors = require("cors");

const allowedURL = config.ALLOWED_URL;
const port = config.APP_PORT;
const dbUrl = config.DB_URL;
const dbUser = config.DB_USER;
const dbPwd = config.DB_PWD;
const dbCollection = config.DB_COLLECTION;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for ComputHand",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from ComputHand.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Computhand.com",
      url: "http://www.computhand.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./app/routes/controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to database
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPwd}@${dbUrl}/${dbCollection}?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then((_) => console.log("Connected Successfully to MongoDB"))
  .catch((err) => console.error(err));

// Sends static files  from the public path directory
routes.use(express.static(path.join(__dirname, "/public")));

// Use morgan to log request in dev mode
routes.use(morgan("dev"));
routes.use(bodyParser.json());
//extended ?
routes.use(bodyParser.urlencoded({ extended: true }));

//sets the required variables from Environment Variables.
// Listen on port defined in config file
routes.listen(port, "0.0.0.0", (err) => {
  if (err) console.error(err);
  //TODO add multilanguage
  console.log(`Listening for Requests on port: ${port}`);
});

//initializes the passport configuration.
routes.use(passport.initialize());
require("./app/config/passport-config");

var corsOptions = {
  origin: allowedURL,
};

routes.use(cors(corsOptions));

//imports our configuration file which holds our verification callbacks and things like the secret for signing.
routes.use("/api/public", require("./app/routes/public"));

//TODO add session
routes.use(
  "/api/private",
  passport.authenticate("jwt", { session: false }),
  require("./app/routes/private")
);

// Server index.html page when request to the root is made
routes.get("/", function (req, res, next) {
  res.sendfile("./public/index.html");
});
