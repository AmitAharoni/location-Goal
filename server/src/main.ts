import * as express from 'express';
import { randPosWithinRadius, isGoalOccurs } from './functions'
import * as turf from '@turf/turf'

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/randomCoordinate', (req, res) => {
    const { latitude, longitude, radius, unit } = req.query;
    const position = { latitude:+latitude, longitude:+longitude}
    const pos = randPosWithinRadius(position, +radius, unit as turf.Units);

    res.status(200).send({ pos });
})

app.get('/isGoalOccurs', (req, res) => {
    const { latitude, longitude, goalDistance, unit } = req.query;
    const ballPos = { latitude:+latitude, longitude:+longitude}
    const resBool = isGoalOccurs(ballPos, +goalDistance, unit as turf.Units);

    res.status(200).send({ resBool });
})
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})