// @flow

import type { IRoom, IRoomOptions } from "./interface";
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
  yMinScale: number;

  constructor(options: IRoomOptions) {
    super({
      x: 0,
      y: 0,
      width: options.width,
      height: options.height,
      imagePath: options.imagePath
    });

    this.id = options.id;
    this.name = options.name;
    this.items = new Map();
    this.actors = new Map();
    this.currentVerb = options.currentVerb;
    this.walkableArea = options.walkableArea;
    this.yMinScale = options.yMinScale || 1;

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
    this.actors.set(options.id, new Actor(options));
  }

  async init(): Promise<void> {
    await super.init();

    // Sort actors by Y values
    this.actors = new Map(
      Array.from(this.actors.entries()).sort(([, a], [, b]) => a.y - b.y)
    );

    // Init actors
    await Promise.all(
      Array.from(this.actors.values()).map((actor: IActor) => actor.init(this))
    );
  }
}
