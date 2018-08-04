// @flow

export type Verb =
  | "PUSH"
  | "PULL"
  | "OPEN"
  | "CLOSE"
  | "GIVE"
  | "PICK_UP"
  | "TALK_TO"
  | "LOOK_AT"
  | "USE";

export interface Room {
  id: string;
  name: string;
  items: Map<string, Item>;
  actors: Map<string, Actor>;
  currentActor: Actor;
  currentVerb: Verb;
}

export interface Actor {
  id: string;
  name: string;
  inventory: Item[];
  do: (verb: Verb) => void;
  moveTo: (x: number, y: number) => void;
  say: (text: string) => void;
}

export interface Item {
  id: string;
  name: string;
  verbs: Map<Verb, () => void>;
  inventoryImage: string;
}
