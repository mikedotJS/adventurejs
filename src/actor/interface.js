// @flow

import type { IItem } from "../item/interface";
import type { IVerb } from "../verb/interface";
import type { IRenderable, IRenderableOptions } from "../renderable/interface";

export interface IActorOptions extends IRenderableOptions {
  id: string;
  name: string;
  inventory: IItem[];
}

export interface IActor extends IRenderable {
  id: string;
  name: string;
  inventory: Map<string, IItem>;

  registerItem(item: IItem): void;
  do(verb: IVerb): void;
  moveTo(x: number, y: number): void;
  say(text: string): void;
}
