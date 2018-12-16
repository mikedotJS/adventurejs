import type { IPoint } from "../point/interface";

export interface IMoveGraph {
  walkableArea: IPoint[];
  actor: IPoint;
  borders: [IPoint, IPoint][];
  paths: [IPoint, IPoint][];
  mousePath: [IPoint, IPoint];

  updateMousePath(mousePosition: IPoint): void;
}
