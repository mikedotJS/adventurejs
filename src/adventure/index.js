// @flow

import type { IRoom, IRoomOptions } from "../room/interface";

import { Room } from "../room";

export class Adventure {
  static width: number;
  static height: number;

  static canvas: HTMLCanvasElement;
  static context: CanvasRenderingContext2D;

  static rooms: Map<string, IRoom>;
  static currentRoom: IRoom;

  static registerRooms(rooms: IRoomOptions[]): void {
    if (!Adventure.rooms) {
      Adventure.rooms = new Map();
    }

    rooms.forEach(options => {
      Adventure.rooms.set(options.id, new Room(options));
    });
  }

  static init(): void {
    Adventure.removeCanvas();

    Adventure.canvas = document.createElement("canvas");
    Adventure.context = Adventure.canvas.getContext("2d");

    Adventure.width = Adventure.width || 640;
    Adventure.height = Adventure.height || 480;

    Adventure.canvas.width = Adventure.width;
    Adventure.canvas.height = Adventure.height;

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

  static openRoom(roomId: string): void {
    Adventure.currentRoom = Adventure.rooms.get(roomId);

    if (Adventure.currentRoom) {
      Adventure.currentRoom.open();
    } else {
      console.error(`Unable to open room "${roomId}": room not found.`);
    }
  }
}
