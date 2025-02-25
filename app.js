const express = require("express");
const path = require("path");
require("dotenv").config();

const v1Routes = require("./api/routes/v1/v1");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

// Register API Routes
app.use("/api/v1", v1Routes);

module.exports = app;
