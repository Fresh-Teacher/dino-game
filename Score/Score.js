/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Score extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("1", "./Score/costumes/1.png", { x: 20, y: 27 }),
      new Costume("2", "./Score/costumes/2.png", { x: 23, y: 27 }),
      new Costume("3", "./Score/costumes/3.png", { x: 23, y: 27 }),
      new Costume("4", "./Score/costumes/4.png", { x: 23, y: 27 }),
      new Costume("5", "./Score/costumes/5.png", { x: 23, y: 27 }),
      new Costume("6", "./Score/costumes/6.png", { x: 23, y: 27 }),
      new Costume("7", "./Score/costumes/7.png", { x: 23, y: 27 }),
      new Costume("8", "./Score/costumes/8.png", { x: 23, y: 27 }),
      new Costume("9", "./Score/costumes/9.png", { x: 23, y: 27 }),
      new Costume("0", "./Score/costumes/0.png", { x: 21, y: 27 }),
      new Costume("hi", "./Score/costumes/hi.png", { x: 48, y: 27 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Game Over" },
        this.whenIReceiveGameOver
      )
    ];

    this.vars.scoreDigit = 5;
    this.vars.highscoreDigit = 5;
    this.vars.isHighscoreDigitClones = "yes";
  }

  *whenGreenFlagClicked() {
    this.stage.vars.highscore = 0;
    this.stage.vars.score = 0;
    this.vars.highscoreDigit = 0;
    this.vars.scoreDigit = 0;
    yield* this.createDigits();
  }

  *createDigits() {
    this.costume = 0;
    this.vars.isHighscoreDigitClones = "no";
    for (let i = 0; i < 5; i++) {
      this.vars.scoreDigit++;
      this.createClone();
    }
    this.vars.isHighscoreDigitClones = "yes";
    for (let i = 0; i < 5; i++) {
      this.vars.highscoreDigit++;
      this.createClone();
    }
    this.costume = "hi";
    this.createClone();
  }

  *startAsClone() {
    this.size = 50;
    while (true) {
      if (this.costume.name === "hi") {
        if (this.toString(this.stage.vars.firstTimePlaying) === "no") {
          this.visible = true;
          this.goto(-215, 130);
        } else {
          this.visible = false;
        }
      } else {
        if (this.toString(this.vars.isHighscoreDigitClones) === "yes") {
          if (
            !(
              this.compare(
                this.vars.highscoreDigit,
                this.toString(this.stage.vars.highscore).length
              ) > 0
            ) &&
            this.toString(this.stage.vars.firstTimePlaying) === "no"
          ) {
            this.visible = true;
            this.goto(15 * this.toNumber(this.vars.highscoreDigit) - 195, 130);
            this.costume = this.letterOf(
              this.stage.vars.highscore,
              this.vars.highscoreDigit - 1
            );
          } else {
            this.visible = false;
          }
        } else {
          if (
            !(
              this.compare(
                this.vars.scoreDigit,
                this.toString(this.stage.vars.score).length
              ) > 0
            )
          ) {
            this.visible = true;
            this.goto(15 * this.toNumber(this.vars.scoreDigit) - 235, 160);
            this.costume = this.letterOf(
              this.stage.vars.score,
              this.vars.scoreDigit - 1
            );
          } else {
            this.visible = false;
          }
        }
      }
      yield;
    }
  }

  *whenIReceiveGameOver() {
    if (this.compare(this.stage.vars.score, this.stage.vars.highscore) > 0) {
      this.stage.vars.highscore = this.stage.vars.score;
    }
  }
}
