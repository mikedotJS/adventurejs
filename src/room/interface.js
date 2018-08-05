import type { IVerb } from "../verb/interface";

import type { IActor } from "../actor/interface";
import type { IItem } from "../item/interface";

export interface IRoomOptions {
  id: string;
  name: string;
  background: string;
  items: IItem[];
  actors: IActor[];
  currentActorId: string;
  currentVerb: IVerb;
}

export interface IRoom {
  id: string;
  name: string;
  background: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;

  registerItem(item: IItem): void;
  registerActor(actor: IActor): void;

  init(): void;
  draw(): void;
}
