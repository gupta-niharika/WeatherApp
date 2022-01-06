require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

app.get("/city", async (req, res) => {
    try {
        const {address} = req.query;
        if (!address) {
            return res.send({
                error: "Please provide an address",
            });
        }
        const location = await geocode(address);
        if (!location) throw new Error("Location not found");
        const forecastData = await forecast(location.latitude, location.longitude);
        if (!forecastData) throw new Error("Forecast data not found");
        res.send({
            location,
            forecast: forecastData,
        });
    } catch (e) {
        res.status(e.statusCode || 500).send({
            error: e.message,
        });
    }
});

app.get("/forecast", async (req, res) => {
    try {
        const {latitude, longitude} = req.query;
        const forecastData = await forecast(latitude, longitude);
        if (!forecastData) throw new Error("Forecast data not found");
        res.send({
            location,
            forecast: forecastData,
        });
    } catch (e) {
        res.status(e.statusCode || 500).send({
            error: e.message,
        });
    }
});

module.exports = app;