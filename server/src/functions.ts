import * as turf from '@turf/turf'
import * as globals from 'node-global-storage'

type Position = { latitude:number; longitude:number }

export function randPosWithinRadius(position:Position,radius:number, unit:turf.Units):Position {
    const ballPos = turf.point([position.latitude, position.longitude]);
    const buffer = turf.buffer(ballPos, radius, {units: unit});
    const randPosition = turf.randomPosition(turf.bbox(buffer));
    const goalPosition = {latitude: randPosition[0], longitude: randPosition[1]};
    globals.set('goalPosition', goalPosition);
    
    return goalPosition;
}

export function isGoalOccurs(ballPos:Position, goalDistance:number, unit:turf.Units):Boolean {
    const ballPoint = turf.point([ballPos.latitude, ballPos.longitude]);
    const goalPos = globals.get("goalPosition");
    const goalPoint = turf.point([goalPos.latitude, goalPos.longitude]);
    const distance = turf.distance(ballPoint, goalPoint, {units: unit});

    return distance < goalDistance;
}
