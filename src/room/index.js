// @flow

import type { IActor } from "../actor/interface";
import type { IVerb } from "../verb/interface";
import type { IItem } from "../item/interface";
import type { IRoom, IRoomOptions } from "./interface";

import { Adventure } from "../adventure";

export class Room implements IRoom {
  id: string;
  name: string;
  background: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;

  constructor(options: IRoomOptions) {
    this.id = options.id;
    this.name = options.name;
    this.background = options.background;
    this.items = new Map();
    this.actors = new Map();
    this.currentVerb = options.currentVerb;

    options.items.forEach(item => this.registerItem(item));
    options.actors.forEach(actor => this.registerActor(actor));

    const currentActor = this.actors.get(options.currentActorId);

    if (currentActor) {
      this.currentActor = currentActor;
    } else {
      console.error(
        `Unable to set current actor: actor "${
          options.currentActorId
        }" not found.`
      );
    }
  }

  registerItem(item: IItem): void {
    this.items.set(item.id, item);
  }

  registerActor(actor: IActor): void {
    this.actors.set(actor.id, actor);
  }

  open(): void {
    const background = new Image();

    background.addEventListener("load", () => {
      Adventure.context.drawImage(
        background,
        0,
        0,
        Adventure.width,
        Adventure.height
      );
    });

    background.setAttribute("src", this.background);
  }
}
