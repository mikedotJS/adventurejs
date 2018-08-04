// @flow

import type { IActor } from "./interface";
import type { IVerb } from "../verb/interface";
import type { IItem } from "../item/interface";

interface IActorOptions {
  id: string;
  name: string;
  inventory: IItem[];
}

export class Actor implements IActor {
  id: string;
  name: string;
  inventory: Map<string, IItem>;

  constructor(options: IActorOptions) {
    this.id = options.id;
    this.name = options.name;
    this.inventory = new Map();

    options.inventory.forEach(item => this.registerItem(item));
  }

  registerItem(item: IItem): void {
    this.inventory.set(item.id, item);
  }

  do(verb: IVerb): void {}

  moveTo(x: number, y: number): void {}

  say(text: string): void {}
}
