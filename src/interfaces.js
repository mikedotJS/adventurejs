// @flow

export type Verb = "PUSH" | "PULL" | "OPEN" | "CLOSE";

export interface Room {
  id: string;
  name: string;
  items: Item[];
}

export interface Actor {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  verbs: Map<Verb, () => void>;
}
