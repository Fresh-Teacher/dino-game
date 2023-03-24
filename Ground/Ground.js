/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ground extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Ground", "./Ground/costumes/Ground.png", { x: 465, y: 10 })
    ];

    this.sounds = [];

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

  *scroll() {
    this.x -= 10;
    if (this.compare(this.x, -480) < 0) {
      this.x = this.x * -1;
    }
  }

  *startAsClone() {
    this.goto(480, -138);
    while (true) {
      yield* this.scroll();
      yield;
    }
  }

  *whenIReceiveGameOver() {
    /* TODO: Implement stop other scripts in sprite */ null;
  }

  *whenIReceiveStartGame() {
    this.visible = true;
    this.goto(0, -138);
    this.createClone();
    while (true) {
      yield* this.scroll();
      yield;
    }
  }

  *whenIReceiveStartGame2() {
    this.deleteThisClone();
  }
}
