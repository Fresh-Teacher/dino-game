/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class RetryButton extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("retry", "./RetryButton/costumes/retry.png", {
        x: 106,
        y: 84
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      )
    ];
  }

  *whenIReceiveGameOver() {
    this.visible = true;
    this.moveAhead();
    this.goto(0, -30);
    while (true) {
      if (this.touching("mouse") && this.mouse.down) {
        while (!!(this.touching("mouse") && this.mouse.down)) {
          yield;
        }
        this.stage.vars.gameOver = "no";
        this.stage.vars.firstTimePlaying = "no";
        this.stage.vars.score = 0;
        this.broadcast("Start Game");
        return;
      }
      yield;
    }
  }

  *whenIReceiveStartGame() {
    this.visible = false;
  }
}
