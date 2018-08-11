// @flow

import type { IRoom, IRoomOptions } from "../room/interface";
import type { IRenderer } from "../renderer/interface";

export interface IAdventure {
  width: number;
  height: number;

  rooms: Map<string, IRoom>;
  currentRoom: IRoom;

  debug: boolean;
  renderer: IRenderer;

  registerRooms(rooms: IRoomOptions[]): void;
  openRoom(roomId: string): void;
}
