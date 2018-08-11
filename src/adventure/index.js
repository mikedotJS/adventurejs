// @flow

import type { IAdventure } from "./interface";
import type { IRoom, IRoomOptions } from "../room/interface";
import type { IRenderer } from "../renderer/interface";

import { Renderer } from "../renderer";
import { Room } from "../room";

export class Adventure implements IAdventure {
  width: number;
  height: number;

  rooms: Map<string, IRoom>;
  currentRoom: IRoom;

  debug: boolean;
  renderer: IRenderer;

  constructor(width: number = 640, height: number = 480, fps: number = 60) {
    this.width = width;
    this.height = height;

    this.rooms = new Map();
    this.currentRoom = null;

    this.debug = false;
    this.renderer = new Renderer(this, fps);
  }

  registerRooms(rooms: IRoomOptions[]): void {
    rooms.forEach(options => {
      this.rooms.set(options.id, new Room(options));
    });
  }

  openRoom(roomId: string): void {
    this.currentRoom = this.rooms.get(roomId);

    if (this.currentRoom) {
      this.currentRoom.init();
    } else {
      console.error(`Unable to open room "${roomId}": room not found.`);
    }
  }
}
