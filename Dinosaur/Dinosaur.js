/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Dinosaur extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Normal", "./Dinosaur/costumes/Normal.png", { x: 81, y: 86 }),
      new Costume("Walk 1", "./Dinosaur/costumes/Walk 1.png", { x: 81, y: 86 }),
      new Costume("Walk 2", "./Dinosaur/costumes/Walk 2.png", { x: 80, y: 86 }),
      new Costume("Scared", "./Dinosaur/costumes/Scared.png", { x: 74, y: 79 })
    ];

    this.sounds = [new Sound("pop", "./Dinosaur/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Start Game" },
        this.whenIReceiveStartGame3
      )
    ];

    this.vars.yVelocity = -17.299999999999997;
    this.vars.startingYPos = -123;
  }

  *checkJumping(fallSpeed, jumpHeight) {
    if (
      !(
        this.compare(
          this.y + this.toNumber(this.vars.yVelocity),
          this.vars.startingYPos
        ) < 0
      )
    ) {
      this.y += this.toNumber(this.vars.yVelocity);
      this.vars.yVelocity += this.toNumber(fallSpeed);
    } else {
      this.vars.yVelocity = 0;
      this.y = this.toNumber(this.vars.startingYPos);
      if (this.mouse.down || this.keyPressed("space")) {
        this.vars.yVelocity = jumpHeight;
      }
    }
  }

  *whenIReceiveStartGame() {
    yield* this.wait(0.01);
    while (true) {
      if (this.touching(this.sprites["Cactus"].andClones())) {
        this.stage.vars.gameOver = "yes";
        this.broadcast("Game Over");
        this.costume = "Scared";
        /* TODO: Implement stop other scripts in sprite */ null;
        return;
      }
      yield;
    }
  }

  *whenIReceiveStartGame2() {
    this.visible = true;
    this.vars.startingYPos = -123;
    this.vars.yVelocity = 0;
    this.goto(-187, this.toNumber(this.vars.startingYPos));
    this.moveAhead();
    while (true) {
      yield* this.checkJumping(-2.7, 20.5);
      yield;
    }
  }

  *whenIReceiveStartGame3() {
    while (true) {
      if (this.compare(this.y, this.vars.startingYPos) === 0) {
        this.costume = "Walk 1";
        yield* this.wait(0.07);
        this.costume = "Walk 2";
        yield* this.wait(0.07);
      } else {
        this.costume = "Normal";
      }
      yield;
    }
  }
}
