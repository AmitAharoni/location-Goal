"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGoalOccurs = exports.randPosWithinRadius = void 0;
const turf = require("@turf/turf");
const globals = require("node-global-storage");
function randPosWithinRadius(position, radius, unit) {
    const ballPos = turf.point([position.latitude, position.longitude]);
    const buffer = turf.buffer(ballPos, radius, { units: unit });
    const randPosition = turf.randomPosition(turf.bbox(buffer));
    const goalPosition = { latitude: randPosition[0], longitude: randPosition[1] };
    globals.set('goalPosition', goalPosition);
    return goalPosition;
}
exports.randPosWithinRadius = randPosWithinRadius;
function isGoalOccurs(ballPos, goalDistance, unit) {
    const ballPoint = turf.point([ballPos.latitude, ballPos.longitude]);
    const goalPos = globals.get("goalPosition");
    const goalPoint = turf.point([goalPos.latitude, goalPos.longitude]);
    const distance = turf.distance(ballPoint, goalPoint, { units: unit });
    return distance < goalDistance;
}
exports.isGoalOccurs = isGoalOccurs;
//# sourceMappingURL=functions.js.map