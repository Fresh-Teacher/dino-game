/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloud extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("cloud", "./Cloud/costumes/cloud.png", { x: 107, y: 40 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame2
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStartGame() {
    yield* this.wait(0.01);
    while (true) {
      this.createClone();
      yield* this.wait(8);
      yield;
    }
  }

  *startAsClone() {
    this.visible = true;
    this.goto(260, this.random(-30, 140));
    while (!(this.compare(this.x, -270) < 0)) {
      this.size = 150;
      this.x -= 1;
      this.size = 50;
      yield;
    }
    this.deleteThisClone();
  }

  *whenIReceiveGameOver() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStartGame2() {
    this.deleteThisClone();
  }
}
