// @flow

import type { IItem } from "../item/interface";
import type { IVerb } from "../verb/interface";

export interface IActor {
  id: string;
  name: string;
  inventory: Map<string, IItem>;

  registerItem(item: IItem): void;
  do(verb: IVerb): void;
  moveTo(x: number, y: number): void;
  say(text: string): void;
}
