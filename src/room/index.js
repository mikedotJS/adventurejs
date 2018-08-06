// @flow

import type { IRoom, IRoomOptions } from "./interface";
import type { IAdventure } from "../adventure/interface";
import type { IRenderer } from "../renderer/interface";
import type { IActor } from "../actor/interface";
import type { IVerb } from "../verb/interface";
import type { IItem } from "../item/interface";
import type { IPoint } from "../point/interface";

export class Room implements IRoom {
  adventure: IAdventure;
  renderer: IRenderer;

  id: string;
  name: string;
  background: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;
  walkableArea: IPoint[];

  backgroundImage: HTMLImageElement;
  backgroundImageReady: boolean;

  constructor(adventure: IAdventure, options: IRoomOptions) {
    this.adventure = adventure;
    this.renderer = adventure.renderer;

    this.id = options.id;
    this.name = options.name;
    this.background = options.background;
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

  registerActor(actor: IActor): void {
    this.actors.set(actor.id, actor);
  }

  init(): void {
    this.backgroundImage = new Image();
    this.backgroundImageReady = false;

    this.backgroundImage.addEventListener("load", () => {
      this.backgroundImageReady = true;
    });

    this.backgroundImage.setAttribute("src", this.background);
  }

  draw(): void {
    if (this.backgroundImageReady) {
      this.renderer.context.drawImage(
        this.backgroundImage,
        0,
        0,
        this.adventure.width,
        this.adventure.height
      );
    }
  }
}
