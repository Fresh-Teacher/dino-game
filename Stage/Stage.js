/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("dino", "./Stage/costumes/dino.png", { x: 0, y: 0 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      )
    ];

    this.vars.gameOver = "yes";
    this.vars.score = 93;
    this.vars.highscore = 93;
    this.vars.firstTimePlaying = "yes";

    this.watchers.score = new Watcher({
      label: "Score",
      style: "normal",
      visible: true,
      value: () => this.vars.score,
      x: 468,
      y: 170
    });
  }

  *whenGreenFlagClicked() {}

  *whenIReceiveStartGame() {
    this.vars.firstTimePlaying = "yes";
    this.vars.gameOver = "no";
    while (true) {
      if (this.toString(this.vars.gameOver) === "no") {
        this.vars.score++;
        yield* this.wait(0.1);
      }
      yield;
    }
  }
}
