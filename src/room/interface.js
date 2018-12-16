import type { IRenderable } from "../renderable/interface";
import type { IVerb } from "../verb/interface";
import type { IActor } from "../actor/interface";
import type { IItem } from "../item/interface";
import type { IPoint } from "../point/interface";
import type { IMoveGraph } from "../move-graph/interface";

export interface IRoomOptions {
  id: string;
  name: string;
  width: number;
  height: number;
  imagePath: string;
  items: IItem[];
  actors: IActor[];
  currentActorId: string;
  currentVerb: IVerb;
  walkableArea: IPoint[];
  yMinScale?: number;
}

export interface IRoom extends IRenderable {
  id: string;
  name: string;
  background: string;
  items: Map<string, IItem>;
  actors: Map<string, IActor>;
  currentActor: IActor;
  currentVerb: IVerb;
  walkableArea: IPoint[];
  yMinScale: number;
  moveGraph: IMoveGraph;

  registerItem(item: IItem): void;
  registerActor(actor: IActor): void;
  init(): void;
}
