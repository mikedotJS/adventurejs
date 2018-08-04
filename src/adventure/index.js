// @flow

import type { IRoom } from "../room/interface";

import type { IAdventure } from "./interface";

interface IAdventureOptions {
  width: number;
  height: number;
  rooms: IRoom[];
}

export class Adventure implements IAdventure {
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  rooms: Map<string, IRoom>;

  constructor(options: IAdventureOptions) {
    this.width = options.width;
    this.height = options.height;
    this.rooms = new Map();

    options.rooms.forEach(room => this.registerRoom(room));
  }

  registerRoom(room: IRoom): void {
    this.rooms.set(room.id, room);
  }

  init(): void {
    Adventure.removeCanvas();

    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    if (document.body) {
      document.body.insertBefore(this.canvas, document.body.firstChild);
    }

    this.canvas.style.backgroundColor = "black";
  }

  static removeCanvas(): void {
    if (document.body) {
      Array.from(document.body.getElementsByTagName("canvas")).forEach(
        element => element.remove()
      );
    }
  }
}
