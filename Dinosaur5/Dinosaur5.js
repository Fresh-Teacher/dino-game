/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dinosaur5 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Dinosaur5-a", "./Dinosaur5/costumes/Dinosaur5-a.png", {
        x: 104,
        y: 150
      }),
      new Costume("Dinosaur5-b", "./Dinosaur5/costumes/Dinosaur5-b.png", {
        x: 112,
        y: 166
      }),
      new Costume("Dinosaur5-c", "./Dinosaur5/costumes/Dinosaur5-c.png", {
        x: 112,
        y: 150
      }),
      new Costume("Dinosaur5-d", "./Dinosaur5/costumes/Dinosaur5-d.png", {
        x: 90,
        y: 134
      }),
      new Costume("Dinosaur5-e", "./Dinosaur5/costumes/Dinosaur5-e.png", {
        x: 88,
        y: 150
      }),
      new Costume("Dinosaur5-f", "./Dinosaur5/costumes/Dinosaur5-f.png", {
        x: 94,
        y: 166
      }),
      new Costume("Dinosaur5-g", "./Dinosaur5/costumes/Dinosaur5-g.png", {
        x: 102,
        y: 150
      }),
      new Costume("Dinosaur5-h", "./Dinosaur5/costumes/Dinosaur5-h.png", {
        x: 108,
        y: 134
      })
    ];

    this.sounds = [
      new Sound("dance funky", "./Dinosaur5/sounds/dance funky.wav"),
      new Sound("bite", "./Dinosaur5/sounds/bite.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = true;
    this.moveBehind();
    yield* this.wait(3);
    this.visible = false;
    this.broadcast("Start Game");
  }
}
