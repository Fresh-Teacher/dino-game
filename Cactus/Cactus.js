/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cactus extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cactus1", "./Cactus/costumes/cactus1.png", { x: 33, y: 66 }),
      new Costume("cactus2", "./Cactus/costumes/cactus2.png", { x: 65, y: 66 }),
      new Costume("cactus3", "./Cactus/costumes/cactus3.png", { x: 97, y: 66 }),
      new Costume("cactus4", "./Cactus/costumes/cactus4.png", {
        x: 49,
        y: 118
      }),
      new Costume("cactus5", "./Cactus/costumes/cactus5.png", { x: 94, y: 114 })
    ];

    this.sounds = [new Sound("pop", "./Cactus/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame2
      )
    ];
  }

  *startAsClone() {
    this.visible = true;
    this.goto(260, -127);
    this.costume = this.random(1, 5);
    if (this.toString(this.stage.vars.gameOver) === "yes") {
      this.deleteThisClone();
    }
    while (!(this.compare(this.x, -260) < 0)) {
      this.size = 150;
      this.x -= 10;
      this.size = 50;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveGameOver() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStartGame() {
    this.visible = false;
    while (true) {
      yield* this.wait(this.random(0.5, 1.8));
      this.createClone();
      yield;
    }
  }

  *whenIReceiveStartGame2() {
    this.deleteThisClone();
  }
}
