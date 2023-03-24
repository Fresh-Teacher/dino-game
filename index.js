import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Dinosaur from "./Dinosaur/Dinosaur.js";
import Cactus from "./Cactus/Cactus.js";
import Ground from "./Ground/Ground.js";
import Cloud from "./Cloud/Cloud.js";
import GameOver from "./GameOver/GameOver.js";
import RetryButton from "./RetryButton/RetryButton.js";
import Score from "./Score/Score.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import Dinosaur5 from "./Dinosaur5/Dinosaur5.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Dinosaur: new Dinosaur({
    x: -187,
    y: -81.69999999999996,
    direction: 90,
    costumeNumber: 4,
    size: 50,
    visible: true,
    layerOrder: 6
  }),
  Cactus: new Cactus({
    x: -11,
    y: -125,
    direction: 90,
    costumeNumber: 2,
    size: 50,
    visible: false,
    layerOrder: 5
  }),
  Ground: new Ground({
    x: 480,
    y: -138,
    direction: 90,
    costumeNumber: 1,
    size: 110.00000000000001,
    visible: true,
    layerOrder: 4
  }),
  Cloud: new Cloud({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 3
  }),
  GameOver: new GameOver({
    x: 0,
    y: 30,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: true,
    layerOrder: 7
  }),
  RetryButton: new RetryButton({
    x: 0,
    y: -30,
    direction: 90,
    costumeNumber: 1,
    size: 40,
    visible: true,
    layerOrder: 8
  }),
  Score: new Score({
    x: 75,
    y: 160,
    direction: 90,
    costumeNumber: 11,
    size: 50,
    visible: false,
    layerOrder: 2
  }),
  Thumbnail: new Thumbnail({
    x: 26,
    y: -79,
    direction: 90,
    costumeNumber: 1,
    size: 96.53053037042015,
    visible: true,
    layerOrder: 9
  }),
  Dinosaur5: new Dinosaur5({
    x: 193.71090816230972,
    y: -51.94159358264132,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
