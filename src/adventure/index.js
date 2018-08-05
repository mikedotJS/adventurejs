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

  static mainLoopId: IntervalID;
  static fps: number;
  static debug: boolean;

  static registerRooms(rooms: IRoomOptions[]): void {
    if (!Adventure.rooms) {
      Adventure.rooms = new Map();
    }

    rooms.forEach(options => {
      Adventure.rooms.set(options.id, new Room(options));
    });
  }

  static init(): void {
    Adventure.clear();

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

    Adventure.debug = Adventure.debug || false;
    Adventure.fps = Adventure.fps || 60;

    Adventure.mainLoopId = Adventure.start();
    Adventure.listenKeyboard();
  }

  static clear(): void {
    if (Adventure.mainLoopId) {
      clearInterval(Adventure.mainLoopId);
    }

    if (document.body) {
      Array.from(document.body.getElementsByTagName("canvas")).forEach(
        element => element.remove()
      );
    }
  }

  static start(): IntervalID {
    return setInterval(() => {
      if (Adventure.currentRoom) {
        Adventure.currentRoom.draw();
      }

      if (Adventure.debug) {
        Adventure.drawDebug();
      }
    }, 1000 / Adventure.fps);
  }

  static listenKeyboard(): void {
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 114: // F3
          Adventure.debug = !Adventure.debug;
          break;
        default:
          break;
      }
    });
  }

  static drawDebug(): void {
    Adventure.context.fillStyle = "white";
    Adventure.context.font = "16px Arial";

    let y = 0;
    const lines = [
      "Debug info:",
      `Current room: ${
        Adventure.currentRoom ? Adventure.currentRoom.id : "not defined"
      }`
    ];

    lines.forEach(line => {
      y += 16;
      Adventure.context.fillText(`${line}\n`, 2, y, Adventure.width);
    });
  }

  static openRoom(roomId: string): void {
    Adventure.currentRoom = Adventure.rooms.get(roomId);

    if (Adventure.currentRoom) {
      Adventure.currentRoom.init();
    } else {
      console.error(`Unable to open room "${roomId}": room not found.`);
    }
  }
}
