import type { IVerb } from "../verb/interface";

import { IItem } from "../item/interface";
import type { IActor } from "../actor/interface";

export interface IRoom {
  id: string;
  name: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;

  registerItem(item: IItem): void;
  registerActor(actor: IActor): void;
}
