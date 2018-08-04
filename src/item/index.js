// @flow

import type { IItem } from "./interface";
import type { IVerb } from "../verb/interface";
import type { IAction } from "../action/interface";

interface IItemOptions {
  id: string;
  name: string;
  actions: {
    [IVerb]: IAction
  };
  inventoryImage: string;
}

export class Item implements IItem {
  id: string;
  name: string;
  actions: Map<IVerb, IAction>;
  inventoryImage: string;

  constructor(options: IItemOptions) {
    this.id = options.id;
    this.name = options.name;
    this.actions = new Map();
    this.inventoryImage = options.inventoryImage;

    Object.keys(options.actions).forEach(verb =>
      this.registerAction(verb, options.actions[verb])
    );
  }

  registerAction(verb: IVerb, action: IAction): void {
    this.actions.set(verb, action);
  }
}
