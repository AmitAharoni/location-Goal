"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const functions_1 = require("./functions");
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.get('/randomCoordinate', (req, res) => {
    const { latitude, longitude, radius, unit } = req.query;
    const position = { latitude: +latitude, longitude: +longitude };
    const pos = functions_1.randPosWithinRadius(position, +radius, unit);
    res.status(200).send({ pos });
});
app.get('/isGoalOccurs', (req, res) => {
    const { latitude, longitude, goalDistance, unit } = req.query;
    const ballPos = { latitude: +latitude, longitude: +longitude };
    const resBool = functions_1.isGoalOccurs(ballPos, +goalDistance, unit);
    res.status(200).send({ resBool });
});
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
//# sourceMappingURL=main.js.map