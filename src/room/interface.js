import type { IVerb } from "../verb/interface";
import type { IRenderer } from "../renderer/interface";
import type { IActor } from "../actor/interface";
import type { IItem } from "../item/interface";
import type { IPoint } from "../point/interface";
import type { IAdventure } from "../adventure/interface";

export interface IRoomOptions {
  id: string;
  name: string;
  background: string;
  items: IItem[];
  actors: IActor[];
  currentActorId: string;
  currentVerb: IVerb;
  walkableArea: IPoint[];
}

export interface IRoom {
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

  registerItem(item: IItem): void;
  registerActor(actor: IActor): void;

  init(): void;
  draw(): void;
}
