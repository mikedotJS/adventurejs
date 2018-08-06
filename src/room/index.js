// @flow

import type { IRoom, IRoomOptions } from "./interface";
import type { IAdventure } from "../adventure/interface";
import type { IActor, IActorOptions } from "../actor/interface";
import type { IVerb } from "../verb/interface";
import type { IItem } from "../item/interface";
import type { IPoint } from "../point/interface";

import { Renderable } from "../renderable";
import { Actor } from "../actor";

export class Room extends Renderable implements IRoom {
  id: string;
  name: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;
  walkableArea: IPoint[];

  constructor(adventure: IAdventure, options: IRoomOptions) {
    super(adventure, {
      x: 0,
      y: 0,
      width: adventure.width,
      height: adventure.height,
      imagePath: options.imagePath
    });

    this.id = options.id;
    this.name = options.name;
    this.items = new Map();
    this.actors = new Map();
    this.currentVerb = options.currentVerb;
    this.walkableArea = options.walkableArea;

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

  registerActor(options: IActorOptions): void {
    this.actors.set(options.id, new Actor(this.adventure, options));
  }

  init(): void {
    super.init();

    this.actors.forEach(actor => {
      actor.init();
    });
  }

  render(): void {
    super.render();

    this.actors.forEach(actor => {
      actor.render();
    });
  }
}
