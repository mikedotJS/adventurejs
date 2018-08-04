import type { IAction } from "../action/interface";
import type { IVerb } from "../verb/interface";

export interface IItem {
  id: string;
  name: string;
  actions: Map<IVerb, IAction>;
  inventoryImage: string;

  registerAction(verb: IVerb, action: IAction): void;
}
