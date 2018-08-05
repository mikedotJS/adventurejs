// @flow

import type { IRoom, IRoomOptions } from "../room/interface";

import { Renderer } from "../renderer";
import { Room } from "../room";

export class Adventure {
  static width: number;
  static height: number;

  static rooms: Map<string, IRoom>;
  static currentRoom: IRoom;

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
    Renderer.init();
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
