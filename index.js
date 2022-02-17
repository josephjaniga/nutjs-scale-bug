"use strict";

const {
    Region,
    screen,
    imageResource,
} = require("@nut-tree/nut-js");

require('@nut-tree/template-matcher');

screen.config.resourceDirectory = './';
screen.config.confidence = 0.78;
screen.config.highlightDurationMs = 5000;

const scaling = 100/125;
const screenSize = {
    x: 1920 * scaling,
    y: 1080 * scaling,
};
/**
 * Half of the pixels on screen, in the center of the screen
 * [x,y,w,h]
 */
const HALF_CENTER = [screenSize.x/4, screenSize.y/4, screenSize.x/2, screenSize.y/2];

async function findWrapper (needleFilename="needle.png", haystackRegion=HALF_CENTER) {

    const searchRegion = new Region(...haystackRegion);
    let searchParameters = {
        searchRegion,
    };

    // highlight the search region - prove this works
    console.log("searchRegion", searchRegion);
    await screen.highlight(searchRegion);

    // find the image
    let outputRegion = await screen.find(
        imageResource(needleFilename),
        searchParameters,
    );

    // highlight the output region
    console.log(outputRegion);
    await screen.highlight(outputRegion);
}

(async ()=>{
    // full screen test
    // Highlight 1 & 2
    await findWrapper("needle.png", [0, 0, screenSize.x, screenSize.y]);
    // partial region test
    // Highlight 3 & 4
    await findWrapper("needle.png", HALF_CENTER);
})();