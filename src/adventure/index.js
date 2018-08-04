// @flow

import type { IRoom } from "../room/interface";

export class Adventure {
  static width: number;
  static height: number;

  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;

  static rooms: Map<string, IRoom>;

  static registerRooms(rooms: IRoom[]): void {
    if (!Adventure.rooms) {
      Adventure.rooms = new Map();
    }

    rooms.forEach(room => {
      Adventure.rooms.set(room.id, room);
    });
  }

  static init(): void {
    Adventure.removeCanvas();

    Adventure.canvas = document.createElement("canvas");
    Adventure.context = Adventure.canvas.getContext("2d");

    Adventure.canvas.width = Adventure.width || 640;
    Adventure.canvas.height = Adventure.height || 480;

    if (document.body) {
      document.body.insertBefore(Adventure.canvas, document.body.firstChild);
    }

    Adventure.canvas.style.backgroundColor = "black";
  }

  static removeCanvas(): void {
    if (document.body) {
      Array.from(document.body.getElementsByTagName("canvas")).forEach(
        element => element.remove()
      );
    }
  }
}
