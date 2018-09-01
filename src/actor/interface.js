// @flow

import type { IItem } from "../item/interface";
import type { IVerb } from "../verb/interface";
import type { IRenderableOptions } from "../renderable/interface";
import type { IRoom } from "../room/interface";
import type { IScalable } from "../scalable/interface";

export interface IActorOptions extends IRenderableOptions {
  id: string;
  name: string;
  inventory: IItem[];
}

export interface IActor extends IScalable {
  id: string;
  name: string;
  inventory: Map<string, IItem>;

  registerItem(item: IItem): void;
  init(currentRoom: IRoom): Promise<void>;
  do(verb: IVerb): void;
  moveTo(x: number, y: number): void;
  say(text: string): void;
}
