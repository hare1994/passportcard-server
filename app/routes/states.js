const express = require('express');

const statesRouter = express.Router();

const BoxesStates = {
        KWS_KERIDOS: 1,
        KWS_KERIDOS_YG: 2,
        UNKNOWN: 3,
        ERROR: 4,
}

const maxStatesNumber = 45;
let currentState = [];

function getRandomState() {
        return Object.keys(BoxesStates)[Math.floor(Math.random() * Object.keys(BoxesStates).length)]
}

function getRandomStates() {
        const states = [];
        for (let i = 0; i < maxStatesNumber; i++) {
                const state = getRandomState();
                let currentTimestamp = Date.now();
                let stateObject = {id: i, state, timeStamp: currentTimestamp};

                if (currentState.length < maxStatesNumber) { // firstTime we randomize the boxes states
                        currentState.push(stateObject);
                } else { // insert only changed data
                        if (currentState[i].state !== state) {
                                // insert to the changed data array
                                states.push(stateObject);

                                // update currentState for the next request. Id is always the same
                                currentState[i].state = state;
                                currentState[i].timeStamp = currentTimestamp;
                        }
                }
        }

        return states.length > 0 ? states : currentState; // if it's not the first time then states length is more than zero
}

statesRouter.get('/getRandomStates', async (req, res, next) => {
        const states = getRandomStates();

        res.status(200).json({states, maxStatesNumber});
});

// Export states router so app.js could use it
module.exports = statesRouter;
